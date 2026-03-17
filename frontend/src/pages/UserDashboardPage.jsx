import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { getProfile } from '../services/api'

function UserDashboardPage() {
  const [profile, setProfile] = useState(null)
  const userId = localStorage.getItem('userId')

  useEffect(() => {
    if (userId) {
      getProfile(userId).then((res) => setProfile(res.data)).catch(() => {})
    }
  }, [userId])

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="p-4 md:p-6 max-w-4xl mx-auto space-y-4">
        <section className="bg-white rounded-xl shadow-sm p-5">
          <h2 className="text-2xl font-bold text-slate-700">Welcome, {profile?.name || 'User'}!</h2>
          <p className="text-slate-600 mt-2">Your account overview and latest activity are shown below.</p>
        </section>
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl shadow-sm p-5">
            <h3 className="font-semibold mb-2">Profile Summary</h3>
            <p><strong>Email:</strong> {profile?.email || '--'}</p>
            <p><strong>Role:</strong> {profile?.role || '--'}</p>
            <Link to="/user-profile" className="inline-block mt-3 px-3 py-2 bg-pastelBlue rounded">Update Profile</Link>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-5">
            <h3 className="font-semibold mb-2">Last Login</h3>
            <p>{profile?.last_login ? new Date(profile.last_login).toLocaleString() : 'No login information yet.'}</p>
          </div>
        </section>
      </main>
    </div>
  )
}

export default UserDashboardPage
