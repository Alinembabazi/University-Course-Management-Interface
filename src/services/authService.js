import { TEST_SUPERVISOR } from '../utils/constants'

const STORAGE_KEY = 'course-management-auth'

export function getStoredUser() {
  const rawUser = localStorage.getItem(STORAGE_KEY)

  if (!rawUser) {
    return null
  }

  try {
    return JSON.parse(rawUser)
  } catch {
    localStorage.removeItem(STORAGE_KEY)
    return null
  }
}

export function loginSupervisor(credentials) {
  const email = credentials.email.trim()
  const password = credentials.password.trim()

  if (
    email === TEST_SUPERVISOR.email &&
    password === TEST_SUPERVISOR.password
  ) {
    const user = {
      email: TEST_SUPERVISOR.email,
      name: TEST_SUPERVISOR.name,
      role: 'supervisor',
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    return user
  }

  throw new Error('Invalid supervisor credentials.')
}

export function logoutSupervisor() {
  localStorage.removeItem(STORAGE_KEY)
}
