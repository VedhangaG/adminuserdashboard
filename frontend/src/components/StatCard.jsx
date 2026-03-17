function StatCard({ title, value, color }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 border border-slate-100">
      <p className="text-sm text-slate-500">{title}</p>
      <p className={`text-2xl font-bold mt-2 ${color}`}>{value}</p>
    </div>
  )
}

export default StatCard
