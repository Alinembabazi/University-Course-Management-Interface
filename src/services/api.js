import axios from 'axios'
import { API_BASE_URL } from '../utils/constants'

// Shared Axios instance for all API requests.
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default api
