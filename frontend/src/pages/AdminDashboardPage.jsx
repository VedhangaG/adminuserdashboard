import { useEffect, useState } from 'react'
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Cell } from 'recharts'
import ChartCard from '../components/ChartCard'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import StatCard from '../components/StatCard'
import { getAnalytics } from '../services/api'

function AdminDashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [analytics, setAnalytics] = useState({ stats: {}, user_growth: [], role_distribution: [], weekly_activity: [] })

  useEffect(() => {
    getAnalytics().then((res) => setAnalytics(res.data)).catch(() => {})
  }, [])

  const stats = analytics.stats || {}

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar onToggleSidebar={() => setSidebarOpen((v) => !v)} />
      <div className="flex">
        <Sidebar isOpen={sidebarOpen} close={() => setSidebarOpen(false)} />
        <main className="flex-1 p-4 md:p-6 md:ml-0">
          <h2 className="text-xl font-bold text-slate-700 mb-4">Admin Dashboard</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
            <StatCard title="Total Users" value={stats.total_users ?? 0} color="text-blue-700" />
            <StatCard title="Total Admins" value={stats.total_admins ?? 0} color="text-purple-700" />
            <StatCard title="Active Users" value={stats.active_users ?? 0} color="text-green-700" />
            <StatCard title="New Users Today" value={stats.new_users_today ?? 0} color="text-orange-700" />
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            <ChartCard title="User Growth Chart">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={analytics.user_growth}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="users" stroke="#A7C7E7" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>
            <ChartCard title="Role Distribution Chart">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={analytics.role_distribution} dataKey="count" nameKey="role" outerRadius={90}>
                    {analytics.role_distribution.map((_, i) => <Cell key={i} fill={['#A7C7E7', '#CDB4DB', '#B7E4C7', '#FFD6A5'][i % 4]} />)}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </ChartCard>
            <ChartCard title="Weekly Activity Chart">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analytics.weekly_activity}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="logins" fill="#B7E4C7" />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>
        </main>
      </div>
    </div>
  )
}

export default AdminDashboardPage
