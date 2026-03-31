import { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { TEST_SUPERVISOR } from '../utils/constants'

function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const { isAuthenticated, login } = useAuth()
  const [formData, setFormData] = useState({
    email: TEST_SUPERVISOR.email,
    password: TEST_SUPERVISOR.password,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const redirectPath = location.state?.from?.pathname || '/dashboard'

  if (isAuthenticated) {
    return <Navigate to={redirectPath} replace />
  }

  function handleChange(event) {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setIsSubmitting(true)

    try {
      await login(formData)
      navigate(redirectPath, { replace: true })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-8">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/70 bg-white/80 shadow-2xl backdrop-blur xl:grid-cols-[1.1fr_0.9fr]">
        <section className="bg-slate-900 p-8 text-white sm:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-sky-300">
            Supervisor Portal
          </p>
          <h1 className="mt-5 max-w-md text-4xl font-bold leading-tight">
            University Course Management Interface
          </h1>
          <p className="mt-5 max-w-lg text-sm leading-7 text-slate-300">
            Manage course listings, review details, and keep academic records
            organized from one dashboard built with React, Vite, Tailwind CSS,
            Axios, and React Context.
          </p>
          <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-sky-200">
              Test account
            </p>
            <p className="mt-4 text-sm">Email: {TEST_SUPERVISOR.email}</p>
            <p className="mt-2 text-sm">
              Password: {TEST_SUPERVISOR.password}
            </p>
          </div>
        </section>

        <section className="p-8 sm:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-600">
            Login
          </p>
          <h2 className="mt-3 text-3xl font-bold text-slate-900">
            Sign in as supervisor
          </h2>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <label className="block text-sm font-medium text-slate-700">
              Email address
              <input
                required
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
              />
            </label>

            <label className="block text-sm font-medium text-slate-700">
              Password
              <input
                required
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
              />
            </label>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-2xl bg-slate-900 px-4 py-3 font-medium text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? 'Signing in...' : 'Login to dashboard'}
            </button>
          </form>
        </section>
      </div>
    </div>
  )
}

export default Login
