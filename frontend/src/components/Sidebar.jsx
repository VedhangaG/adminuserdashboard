import { Link } from 'react-router-dom'

function Sidebar({ isOpen, close }) {
  return (
    <aside className={`fixed md:static z-20 md:z-0 top-0 left-0 h-full w-64 bg-white border-r border-slate-200 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform`}>
      <div className="p-4 font-bold text-slate-700 border-b">Navigation</div>
      <nav className="p-4 space-y-2 text-slate-700">
        <Link onClick={close} className="block px-3 py-2 rounded hover:bg-pastelBlue/30" to="/admin-dashboard">Admin Dashboard</Link>
        <Link onClick={close} className="block px-3 py-2 rounded hover:bg-pastelPurple/30" to="/user-management">User Management</Link>
        <Link onClick={close} className="block px-3 py-2 rounded hover:bg-pastelMint/30" to="/analytics">Analytics</Link>
        <Link onClick={close} className="block px-3 py-2 rounded hover:bg-pastelPeach/30" to="/recent-activity">Recent Activity</Link>
        <Link onClick={close} className="block px-3 py-2 rounded hover:bg-pastelBlue/30" to="/user-profile">My Profile</Link>
      </nav>
    </aside>
  )
}

export default Sidebar
