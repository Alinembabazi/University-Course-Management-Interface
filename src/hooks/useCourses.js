import { useEffect, useState } from 'react'
import { getCourses } from '../services/courseService'
import { getErrorMessage, normalizeCourse } from '../utils/helpers'

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
      setCourses(resolveCourseList(payload).map(normalizeCourse))
    } catch (fetchError) {
      setError(getErrorMessage(fetchError, 'Unable to load courses.'))
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
