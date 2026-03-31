import axios from 'axios'
import { API_BASE_URL } from '../utils/constants'
import { getApiToken } from './authService'

// Shared Axios instance for all API requests.
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const token = getApiToken()

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

export default api
