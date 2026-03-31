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
    apiToken: import.meta.env.VITE_API_TOKEN || '',
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
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-semibold text-slate-900">
          University Course Management
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Sign in with the test supervisor account. If your backend is protected,
          add the API token too.
        </p>

        <div className="mt-4 rounded-md bg-slate-50 p-3 text-sm text-slate-600">
          <p>Email: {TEST_SUPERVISOR.email}</p>
          <p>Password: {TEST_SUPERVISOR.password}</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <label className="block text-sm font-medium text-slate-700">
            Email
            <input
              required
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
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
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
            />
          </label>

          <label className="block text-sm font-medium text-slate-700">
            API token
            <input
              type="text"
              name="apiToken"
              value={formData.apiToken}
              onChange={handleChange}
              placeholder="Paste backend token if required"
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
            />
          </label>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-md bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-70"
          >
            {isSubmitting ? 'Signing in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
