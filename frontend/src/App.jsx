import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import useAuthStore from './store/authStore'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Jobs from './pages/Jobs'
import JobDetail from './pages/JobDetail'
import SeekerDashboard from './pages/SeekerDashboard'
import EmployerDashboard from './pages/EmployerDashboard'
import PostJob from './pages/PostJob'
import Profile from './pages/Profile'

const ProtectedRoute = ({ children, role }) => {
  const { user } = useAuthStore()
  if (!user) return <Navigate to="/login" />
  if (role && user.role !== role) return <Navigate to="/" />
  return children
}

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/jobs/:id" element={<JobDetail />} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute role="seeker"><SeekerDashboard /></ProtectedRoute>} />
        <Route path="/employer/dashboard" element={<ProtectedRoute role="employer"><EmployerDashboard /></ProtectedRoute>} />
        <Route path="/employer/post-job" element={<ProtectedRoute role="employer"><PostJob /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  )
}