import api from './api'
import {
  COURSE_ENDPOINT,
  FALLBACK_COURSE_ENDPOINT,
} from '../utils/constants'

const LOCAL_COURSES_KEY = 'course-management-local-courses'
const COURSE_ENDPOINTS = [COURSE_ENDPOINT, FALLBACK_COURSE_ENDPOINT]

async function requestCourseApi(execute) {
  let lastError

  for (const endpoint of COURSE_ENDPOINTS) {
    try {
      return await execute(endpoint)
    } catch (error) {
      lastError = error

      if (error?.response?.status !== 404) {
        throw error
      }
    }
  }

  throw lastError
}

function readLocalCourses() {
  const rawCourses = localStorage.getItem(LOCAL_COURSES_KEY)

  if (!rawCourses) {
    return []
  }

  try {
    return JSON.parse(rawCourses)
  } catch {
    localStorage.removeItem(LOCAL_COURSES_KEY)
    return []
  }
}

function writeLocalCourses(courses) {
  localStorage.setItem(LOCAL_COURSES_KEY, JSON.stringify(courses))
}

function buildLocalCourse(payload) {
  return {
    _id: `local-${Date.now()}`,
    title: payload.title,
    description: payload.description,
    code: payload.code || 'CRS',
    instructor: payload.instructor || 'TBA',
    credits: payload.credits || 3,
    semester: payload.semester || 'TBA',
  }
}

export function isLocalCourseId(id) {
  return String(id).startsWith('local-')
}

export function getLocalCourses() {
  return readLocalCourses()
}

export function getLocalCourseById(id) {
  return readLocalCourses().find((course) => String(course._id) === String(id))
}

export function createLocalCourse(payload) {
  const courses = readLocalCourses()
  const course = buildLocalCourse(payload)
  writeLocalCourses([course, ...courses])
  return course
}

export function updateLocalCourse(id, payload) {
  const courses = readLocalCourses()
  const updatedCourses = courses.map((course) =>
    String(course._id) === String(id) ? { ...course, ...payload } : course,
  )
  writeLocalCourses(updatedCourses)
  return updatedCourses.find((course) => String(course._id) === String(id))
}

export function deleteLocalCourse(id) {
  const courses = readLocalCourses()
  writeLocalCourses(courses.filter((course) => String(course._id) !== String(id)))
}

// API examples:
// POST https://student-management-system-backend.up.railway.app/api/courses
// GET  https://student-management-system-backend.up.railway.app/api/courses/:id

export async function getCourses() {
  const response = await requestCourseApi((endpoint) => api.get(endpoint))
  return response.data
}

export async function getCourseById(id) {
  const response = await requestCourseApi((endpoint) => api.get(`${endpoint}/${id}`))
  return response.data
}

export async function createCourse(payload) {
  const response = await requestCourseApi((endpoint) => api.post(endpoint, payload))
  return response.data
}

export async function updateCourse(id, payload) {
  const response = await requestCourseApi((endpoint) => api.put(`${endpoint}/${id}`, payload))
  return response.data
}

export async function deleteCourse(id) {
  const response = await requestCourseApi((endpoint) => api.delete(`${endpoint}/${id}`))
  return response.data
}
