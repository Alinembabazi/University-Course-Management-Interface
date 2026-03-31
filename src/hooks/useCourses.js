import { useEffect, useState } from 'react'
import { getCourses, getLocalCourses } from '../services/courseService'
import {
  getErrorMessage,
  getUnauthorizedMessage,
  normalizeCourse,
} from '../utils/helpers'

function resolveCourseList(payload) {
  if (Array.isArray(payload)) {
    return payload
  }

  if (Array.isArray(payload?.courses)) {
    return payload.courses
  }

  if (Array.isArray(payload?.data)) {
    return payload.data
  }

  return []
}

export function useCourses() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  async function fetchCourses() {
    setLoading(true)
    setError('')

    try {
      const payload = await getCourses()
      setCourses([
        ...getLocalCourses().map(normalizeCourse),
        ...resolveCourseList(payload).map(normalizeCourse),
      ])
    } catch (fetchError) {
      setCourses(getLocalCourses().map(normalizeCourse))

      if (fetchError?.response?.status === 401) {
        setError(getUnauthorizedMessage())
      } else {
        setError(getErrorMessage(fetchError, 'Unable to load courses.'))
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCourses()
  }, [])

  return {
    courses,
    loading,
    error,
    refreshCourses: fetchCourses,
  }
}
