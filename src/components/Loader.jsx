function Loader({ message = 'Loading...' }) {
  return (
    <div className="flex min-h-[240px] flex-col items-center justify-center gap-4 rounded-3xl border border-slate-200 bg-white/80 p-8 text-slate-700 shadow-sm">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-sky-200 border-t-sky-600" />
      <p className="text-sm font-medium">{message}</p>
    </div>
  )
}

export default Loader
