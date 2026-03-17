import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../services/api'

function AdminLoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const { data } = await loginUser({ email, password })
      if (data.role !== 'admin') {
        setError('Only admin accounts are allowed here')
        return
      }
      localStorage.setItem('token', data.token)
      localStorage.setItem('role', data.role)
      localStorage.setItem('userId', String(data.userId))
      navigate('/admin-dashboard')
    } catch (err) {
      setError(err?.response?.data?.detail || 'Login failed')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50">
      <form onSubmit={submit} className="bg-white w-full max-w-md rounded-xl shadow p-6 space-y-4">
        <h2 className="text-2xl font-bold text-slate-700">Admin Login</h2>
        <input className="w-full border rounded p-2" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input className="w-full border rounded p-2" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button className="w-full py-2 rounded bg-pastelPurple font-semibold">Login</button>
      </form>
    </div>
  )
}

export default AdminLoginPage
