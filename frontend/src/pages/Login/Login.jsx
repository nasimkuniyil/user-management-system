import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../../api/axios";
import { login } from "../../redux/slices/authSlice";
import "./Login.css";

const Login = () => {
  const [signState, setSignState] = useState("Sign In");
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const {isLoggedIn} = useSelector((state)=>state.auth)
  const navigate = useNavigate();
  const location = useLocation();


  useEffect(()=>{
    if(isLoggedIn){
      navigate('/')
    }
  },[]);


  const validate = () => {
    const newErrors = {};

    if (signState === "Sign Up" && !formData.name.trim()) {
      newErrors.name = "name is required";
    }

    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);
      setErrorMessage("");

      const endpoint = signState === "Sign In" ? "/auth/login" : "/auth/register";
      const { data } = await API.post(endpoint, formData);
      console.log('res data : ', data)

      const payload = {
        user: {
          name: data.responseData.name,
          email: data.responseData.email,
          role: data.responseData.role,
        },
        token: data.responseData.token,
        refreshToken: data.responseData.refreshToken,
      };

      dispatch(login(payload));

      const redirect = data.responseData.role === "admin" ? "/dashboard" : "/";
      navigate(location.state?.from || redirect);
    } catch (error) {
      console.error(error);
      setErrorMessage(error.response?.data?.errors[0]?.message || error.response?.data?.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 h-screen flex items-center justify-center">
      <div className="w-full bg-gray-800 rounded-lg shadow sm:max-w-md md:max-w-lg xl:max-w-xl dark:bg-gray-800 dark:border-gray-700 p-6 space-y-6">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-white">
          {signState} to your account
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {signState === "Sign Up" && (
            <div>
              <label className="block mb-2 text-sm font-medium text-white">Your Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="e.g., Walter White"
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>
          )}

          <div>
            <label className="block mb-2 text-sm font-medium text-white">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@gmail.com"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-white">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="••••••••"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 cursor-pointer text-gray-400"
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>

          {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full text-white bg-blue-600 hover:bg-blue-700 rounded-lg px-5 py-2.5 font-medium"
          >
            {loading ? "Processing..." : signState}
          </button>

          <p className="text-sm text-gray-400 text-center">
            {signState === "Sign Up" ? (
              <>
                Already have an account?{" "}
                <span
                  onClick={() => setSignState("Sign In")}
                  className="text-blue-400 cursor-pointer hover:underline"
                >
                  Sign in
                </span>
              </>
            ) : (
              <>
                Don’t have an account yet?{" "}
                <span
                  onClick={() => setSignState("Sign Up")}
                  className="text-blue-400 cursor-pointer hover:underline"
                >
                  Sign up
                </span>
              </>
            )}
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
