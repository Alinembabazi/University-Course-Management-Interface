import api from './api'
import { COURSE_ENDPOINT } from '../utils/constants'

// API examples:
// POST https://student-management-system-backend.up.railway.app/api/courses
// GET  https://student-management-system-backend.up.railway.app/api/courses/:id

export async function getCourses() {
  const response = await api.get(COURSE_ENDPOINT)
  return response.data
}

export async function getCourseById(id) {
  const response = await api.get(`${COURSE_ENDPOINT}/${id}`)
  return response.data
}

export async function createCourse(payload) {
  const response = await api.post(COURSE_ENDPOINT, payload)
  return response.data
}

export async function updateCourse(id, payload) {
  const response = await api.put(`${COURSE_ENDPOINT}/${id}`, payload)
  return response.data
}

export async function deleteCourse(id) {
  const response = await api.delete(`${COURSE_ENDPOINT}/${id}`)
  return response.data
}
