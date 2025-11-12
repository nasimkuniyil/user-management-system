import { Route, Routes } from "react-router-dom"
import Layout from "./pages/user/Layout"
import LandingPage from "./pages/user/LandingPage"
import ErrorPage from "./pages/ErrorPage"
import Login from "./pages/auth/Login"
import AuthLayout from "./pages/auth/Layout"
import Signup from "./pages/auth/Signup"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<LandingPage />} />
      </Route>
      <Route path="/auth" element={<AuthLayout />}>
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<Signup />} />
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  )
}

export default App
