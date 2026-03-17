import { useEffect, useState } from 'react'
import { Bar, BarChart, CartesianGrid, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Cell } from 'recharts'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { getAnalytics } from '../services/api'

function AnalyticsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [data, setData] = useState({ user_growth: [], role_distribution: [], weekly_activity: [] })
  useEffect(() => { getAnalytics().then((res) => setData(res.data)).catch(() => {}) }, [])

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar onToggleSidebar={() => setSidebarOpen((v) => !v)} />
      <div className="flex">
        <Sidebar isOpen={sidebarOpen} close={() => setSidebarOpen(false)} />
        <main className="p-4 md:p-6 flex-1 grid gap-4 grid-cols-1 xl:grid-cols-2">
          <div className="bg-white rounded-xl shadow p-4 h-80"><ResponsiveContainer><LineChart data={data.user_growth}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="date" /><YAxis /><Tooltip /><Line dataKey="users" stroke="#A7C7E7" /></LineChart></ResponsiveContainer></div>
          <div className="bg-white rounded-xl shadow p-4 h-80"><ResponsiveContainer><PieChart><Pie data={data.role_distribution} dataKey="count" nameKey="role" outerRadius={95}>{data.role_distribution.map((_, i) => <Cell key={i} fill={['#A7C7E7', '#CDB4DB', '#B7E4C7', '#FFD6A5'][i % 4]} />)}</Pie><Tooltip /></PieChart></ResponsiveContainer></div>
          <div className="bg-white rounded-xl shadow p-4 h-80 xl:col-span-2"><ResponsiveContainer><BarChart data={data.weekly_activity}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="day" /><YAxis /><Tooltip /><Bar dataKey="logins" fill="#B7E4C7" /></BarChart></ResponsiveContainer></div>
        </main>
      </div>
    </div>
  )
}

export default AnalyticsPage
