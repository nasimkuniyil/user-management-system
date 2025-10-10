import axios from "axios";
import { logout, refreshToken } from "../redux/slices/authSlice";
import { store } from "../redux/store";

const API = axios.create({
  baseURL: "http://localhost:4000/api",
});

API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
        console.log('Authorization header set:', config.headers['Authorization']);
    }
    return config;
});

API.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        console.log('Inside the middleware')
        
        if (error.response?.status === 401 && !originalRequest._retry) {
            console.log('Detected 401 error, attempting token refresh...'); ///////
            originalRequest._retry = true;
            const storedRefreshToken = localStorage.getItem('refreshToken');
            console.log("ref token :",refreshToken)
            try {
                const refreshResponse = await API.post('/auth/refreshToken', { refreshToken: storedRefreshToken }, {
                    withCredentials: true,
                });

                const newAccessToken = refreshResponse.data.token;
                localStorage.setItem('token', newAccessToken);

                store.dispatch(refreshToken(newAccessToken));

                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                console.log('Token updated using refresh token!')
                return API(originalRequest);
            } catch (refreshError) {
                console.error('Token refresh failed:', refreshError);

                store.dispatch(logout());

                window.location.href = '/login';
            }
        }

        if (!error.response) { ///////////////////////
            console.error('Network error:', error.message);
            return Promise.reject(error);
        }

        return Promise.reject(error);
    }
);




export default API;
