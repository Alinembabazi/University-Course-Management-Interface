import { useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import {
  getStoredUser,
  loginSupervisor,
  logoutSupervisor,
} from '../services/authService'
import { getErrorMessage } from '../utils/helpers'
import { AuthContext } from './auth-context'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getStoredUser())
  const loading = false

  async function login(credentials) {
    try {
      const authenticatedUser = loginSupervisor(credentials)
      setUser(authenticatedUser)
      toast.success('Welcome back, supervisor.')
      return authenticatedUser
    } catch (error) {
      const message = getErrorMessage(error, 'Login failed.')
      toast.error(message)
      throw error
    }
  }

  function logout() {
    logoutSupervisor()
    setUser(null)
    toast.success('You have been logged out.')
  }

  const value = useMemo(
    () => ({
      user,
      loading,
      isAuthenticated: Boolean(user),
      login,
      logout,
    }),
    [loading, user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
