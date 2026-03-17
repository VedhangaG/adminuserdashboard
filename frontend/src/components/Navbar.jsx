import { Link, useNavigate } from 'react-router-dom'

function Navbar({ onToggleSidebar }) {
  const navigate = useNavigate()
  const role = localStorage.getItem('role')

  const logout = () => {
    localStorage.clear()
    navigate('/login')
  }

  return (
    <header className="bg-white shadow-sm border-b border-slate-200 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button className="md:hidden px-2 py-1 rounded bg-pastelBlue" onClick={onToggleSidebar}>☰</button>
        <h1 className="font-bold text-slate-700">Admin & User Management</h1>
      </div>
      <div className="flex items-center gap-3 text-sm">
        {role === 'admin' && <Link className="text-slate-600 hover:text-slate-900" to="/admin-dashboard">Dashboard</Link>}
        {role === 'user' && <Link className="text-slate-600 hover:text-slate-900" to="/user-dashboard">Dashboard</Link>}
        <button onClick={logout} className="px-3 py-1 rounded bg-pastelPeach">Logout</button>
      </div>
    </header>
  )
}

export default Navbar
