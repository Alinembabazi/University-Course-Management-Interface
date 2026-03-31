import {
  API_TOKEN_STORAGE_KEY,
  TEST_SUPERVISOR,
} from '../utils/constants'

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
  const apiToken = credentials.apiToken?.trim() || import.meta.env.VITE_API_TOKEN || ''

  if (
    email === TEST_SUPERVISOR.email &&
    password === TEST_SUPERVISOR.password
  ) {
    const user = {
      email: TEST_SUPERVISOR.email,
      name: TEST_SUPERVISOR.name,
      role: 'supervisor',
      apiToken,
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    if (apiToken) {
      localStorage.setItem(API_TOKEN_STORAGE_KEY, apiToken)
    }
    return user
  }

  throw new Error('Invalid supervisor credentials.')
}

export function logoutSupervisor() {
  localStorage.removeItem(STORAGE_KEY)
  localStorage.removeItem(API_TOKEN_STORAGE_KEY)
}

export function getApiToken() {
  return (
    localStorage.getItem(API_TOKEN_STORAGE_KEY) ||
    import.meta.env.VITE_API_TOKEN ||
    ''
  )
}

export function setApiToken(token) {
  const normalizedToken = token.trim()

  if (normalizedToken) {
    localStorage.setItem(API_TOKEN_STORAGE_KEY, normalizedToken)
    return normalizedToken
  }

  localStorage.removeItem(API_TOKEN_STORAGE_KEY)
  return ''
}
