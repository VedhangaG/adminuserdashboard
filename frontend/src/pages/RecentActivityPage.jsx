import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { getAnalytics } from '../services/api'

function RecentActivityPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [items, setItems] = useState([])
  useEffect(() => { getAnalytics().then((res) => setItems(res.data.recent_activity || [])).catch(() => {}) }, [])

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar onToggleSidebar={() => setSidebarOpen((v) => !v)} />
      <div className="flex">
        <Sidebar isOpen={sidebarOpen} close={() => setSidebarOpen(false)} />
        <main className="p-4 md:p-6 flex-1">
          <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
          <div className="bg-white rounded-xl shadow p-4 space-y-3">
            {items.map((item) => (
              <div key={item.id} className="border-b pb-2">
                <p className="font-medium">{item.event}: {item.name}</p>
                <p className="text-sm text-slate-500">{new Date(item.timestamp).toLocaleString()}</p>
              </div>
            ))}
            {!items.length && <p className="text-slate-500">No activity available yet.</p>}
          </div>
        </main>
      </div>
    </div>
  )
}

export default RecentActivityPage
