import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

function Navbar() {
  const { user, logout } = useAuth()

  return (
    <header className="flex flex-col gap-4 border-b border-slate-200 bg-white px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-xl font-semibold text-slate-900">
          University Course Management
        </h1>
        <p className="text-sm text-slate-600">{user?.name || 'Supervisor'}</p>
      </div>

      <div className="flex items-center gap-3">
        <Link
          to="/courses/create"
          className="rounded-md bg-gray-300 px-4 py-2 text-sm font-medium text-white hover:bg-gray-400"
        >
          Add course
        </Link>
        <button
          type="button"
          onClick={logout}
          className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Logout
        </button>
      </div>
    </header>
  )
}

export default Navbar
