import { NavLink } from 'react-router-dom'

const links = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/courses', label: 'Courses' },
  { to: '/courses/create', label: 'Create Course' },
]

function Sidebar() {
  return (
    <aside className="rounded-3xl border border-white/70 bg-slate-900 p-6 text-white shadow-lg">
      <div className="rounded-2xl bg-white/10 p-4">
        <p className="text-xs uppercase tracking-[0.3em] text-sky-200">Panel</p>
        <h2 className="mt-2 text-xl font-bold">Supervisor Access</h2>
        <p className="mt-2 text-sm text-slate-300">
          Navigate through the course records and manage the latest updates.
        </p>
      </div>

      <nav className="mt-8 space-y-2">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `block rounded-2xl px-4 py-3 text-sm font-medium transition ${
                isActive
                  ? 'bg-sky-500 text-white'
                  : 'text-slate-200 hover:bg-white/10 hover:text-white'
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar
