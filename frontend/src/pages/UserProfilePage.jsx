import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { getProfile, updateProfile } from '../services/api'

function UserProfilePage() {
  const userId = localStorage.getItem('userId')
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (userId) {
      getProfile(userId).then((res) => setForm((f) => ({ ...f, name: res.data.name, email: res.data.email }))).catch(() => {})
    }
  }, [userId])

  const save = async (e) => {
    e.preventDefault()
    const payload = { name: form.name, email: form.email }
    if (form.password) payload.password = form.password
    await updateProfile(userId, payload)
    setMessage('Profile updated successfully')
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="p-4 md:p-6 max-w-xl mx-auto">
        <form onSubmit={save} className="bg-white rounded-xl shadow p-5 space-y-3">
          <h2 className="text-xl font-bold">My Profile</h2>
          <input className="w-full border rounded p-2" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input className="w-full border rounded p-2" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <input className="w-full border rounded p-2" type="password" placeholder="New password (optional)" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          {message && <p className="text-green-600 text-sm">{message}</p>}
          <button className="px-4 py-2 rounded bg-pastelMint">Save Changes</button>
        </form>
      </main>
    </div>
  )
}

export default UserProfilePage
