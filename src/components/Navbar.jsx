import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

function Navbar() {
  const { user, logout } = useAuth()

  return (
    <header className="flex flex-col gap-4 rounded-3xl border border-white/70 bg-white/85 p-5 shadow-sm backdrop-blur xl:flex-row xl:items-center xl:justify-between">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-600">
          University Course Management
        </p>
        <h1 className="mt-2 text-2xl font-bold text-slate-900">
          Welcome, {user?.name || 'Supervisor'}
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          Review courses, update records, and keep the catalog organized.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Link
          to="/courses/create"
          className="rounded-2xl bg-slate-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-700"
        >
          Add course
        </Link>
        <button
          type="button"
          onClick={logout}
          className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
        >
          Logout
        </button>
      </div>
    </header>
  )
}

export default Navbar
