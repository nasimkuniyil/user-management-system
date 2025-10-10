import './App.css'
import Login from './pages/Login/Login'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserDetails from './pages/User/UserDetails/UserDetails';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Admin/Dashboard';
import { AdminRoute } from './pages/Admin/AdminRoute';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<UserDetails />} />
        </Route>
        <Route element={<AdminRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
