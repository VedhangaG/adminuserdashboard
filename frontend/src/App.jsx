import { Navigate, Route, Routes } from 'react-router-dom'
import AdminDashboardPage from './pages/AdminDashboardPage'
import AdminLoginPage from './pages/AdminLoginPage'
import AnalyticsPage from './pages/AnalyticsPage'
import RecentActivityPage from './pages/RecentActivityPage'
import UserDashboardPage from './pages/UserDashboardPage'
import UserLoginPage from './pages/UserLoginPage'
import UserManagementPage from './pages/UserManagementPage'
import UserProfilePage from './pages/UserProfilePage'
import UserRegisterPage from './pages/UserRegisterPage'

function ProtectedRoute({ children, allow }) {
  const token = localStorage.getItem('token')
  const role = localStorage.getItem('role')
  if (!token) return <Navigate to="/login" replace />
  if (allow && !allow.includes(role)) return <Navigate to={role === 'admin' ? '/admin-dashboard' : '/user-dashboard'} replace />
  return children
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/register" element={<UserRegisterPage />} />
      <Route path="/login" element={<UserLoginPage />} />
      <Route path="/admin-login" element={<AdminLoginPage />} />
      <Route path="/user-dashboard" element={<ProtectedRoute allow={['user']}><UserDashboardPage /></ProtectedRoute>} />
      <Route path="/admin-dashboard" element={<ProtectedRoute allow={['admin']}><AdminDashboardPage /></ProtectedRoute>} />
      <Route path="/user-profile" element={<ProtectedRoute allow={['user', 'admin']}><UserProfilePage /></ProtectedRoute>} />
      <Route path="/user-management" element={<ProtectedRoute allow={['admin']}><UserManagementPage /></ProtectedRoute>} />
      <Route path="/analytics" element={<ProtectedRoute allow={['admin']}><AnalyticsPage /></ProtectedRoute>} />
      <Route path="/recent-activity" element={<ProtectedRoute allow={['admin']}><RecentActivityPage /></ProtectedRoute>} />
    </Routes>
  )
}

export default App
