import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { createUser, deleteUser, getUsers, updateUser } from '../services/api'

const blank = { name: '', email: '', password: '', role: 'user' }

function UserManagementPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [users, setUsers] = useState([])
  const [form, setForm] = useState(blank)
  const [editingId, setEditingId] = useState(null)

  const load = () => getUsers().then((res) => setUsers(res.data)).catch(() => {})
  useEffect(() => { load() }, [])

  const submit = async (e) => {
    e.preventDefault()
    if (editingId) {
      await updateUser(editingId, form)
      setEditingId(null)
    } else {
      await createUser(form)
    }
    setForm(blank)
    load()
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar onToggleSidebar={() => setSidebarOpen((v) => !v)} />
      <div className="flex">
        <Sidebar isOpen={sidebarOpen} close={() => setSidebarOpen(false)} />
        <main className="p-4 md:p-6 flex-1">
          <h2 className="text-xl font-bold mb-4">User Management</h2>
          <form onSubmit={submit} className="bg-white rounded-xl shadow p-4 grid grid-cols-1 md:grid-cols-5 gap-2 mb-4">
            <input className="border rounded p-2" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            <input className="border rounded p-2" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
            <input className="border rounded p-2" type="password" placeholder={editingId ? 'Password (optional)' : 'Password'} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required={!editingId} />
            <select className="border rounded p-2" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}><option value="user">User</option><option value="admin">Admin</option></select>
            <button className="rounded bg-pastelBlue px-3 py-2">{editingId ? 'Update User' : 'Create User'}</button>
          </form>

          <div className="bg-white rounded-xl shadow p-4 overflow-x-auto">
            <table className="w-full min-w-[700px] text-left">
              <thead><tr className="border-b"><th>ID</th><th>Name</th><th>Email</th><th>Role</th><th>Created Date</th><th>Actions</th></tr></thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id} className="border-b">
                    <td className="py-2">{u.id}</td><td>{u.name}</td><td>{u.email}</td><td>{u.role}</td><td>{new Date(u.created_at).toLocaleDateString()}</td>
                    <td className="space-x-2">
                      <button className="px-2 py-1 bg-pastelMint rounded" onClick={() => { setEditingId(u.id); setForm({ ...blank, name: u.name, email: u.email, role: u.role }) }}>Edit</button>
                      <button className="px-2 py-1 bg-pastelPeach rounded" onClick={async () => { await deleteUser(u.id); load() }}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  )
}

export default UserManagementPage
