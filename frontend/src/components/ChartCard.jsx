function ChartCard({ title, children }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 border border-slate-100">
      <h3 className="font-semibold text-slate-700 mb-3">{title}</h3>
      <div className="h-72">{children}</div>
    </div>
  )
}

export default ChartCard
