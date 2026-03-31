import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Loader from '../components/Loader'
import {
  getCourseById,
  getLocalCourseById,
  isLocalCourseId,
} from '../services/courseService'
import {
  getErrorMessage,
  getUnauthorizedMessage,
  normalizeCourse,
} from '../utils/helpers'

function CourseDetail() {
  const { id } = useParams()
  const [course, setCourse] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchCourse() {
      setLoading(true)
      setError('')

      try {
        const payload = isLocalCourseId(id)
          ? getLocalCourseById(id)
          : await getCourseById(id)
        setCourse(normalizeCourse(payload?.course || payload?.data || payload))
      } catch (fetchError) {
        if (fetchError?.response?.status === 401) {
          setError(getUnauthorizedMessage())
        } else {
          setError(getErrorMessage(fetchError, 'Unable to load the course details.'))
        }
      } finally {
        setLoading(false)
      }
    }

    fetchCourse()
  }, [id])

  if (loading) {
    return <Loader message="Loading course details..." />
  }

  if (error) {
    return (
      <div className="rounded-lg border border-rose-200 bg-white p-6">
        <p className="text-sm text-rose-600">{error}</p>
      </div>
    )
  }

  return (
    <section className="rounded-lg border border-slate-400 bg-white p-6 text-slate-900">
      <h2 className="text-2xl font-semibold text-gray-600">{course?.title}</h2>
      <p className="mt-3 text-sm leading-7 text-gray-400">
        {course?.description || 'No course description is available.'}
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="rounded-md bg-gray-100 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-gray-350">Code</p>
          <p className="mt-2 text-lg font-semibold text-gray-300">{course?.code}</p>
        </div>
        <div className="rounded-md bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-gray-300">
            Instructor
          </p>
          <p className="mt-2 text-lg font-semibold text-gray-350">
            {course?.instructor}
          </p>
        </div>
        <div className="rounded-md bg-gray-100 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-gray-350">
            Semester
          </p>
          <p className="mt-2 text-lg font-semibold text-gray-300">
            {course?.semester}
          </p>
        </div>
        <div className="rounded-md bg-gray-400 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-gray-300">
            Credits
          </p>
          <p className="mt-2 text-lg font-semibold text-gray-300">
            {course?.credits}
          </p>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          to={`/courses/${course?.id}/edit`}
          className="rounded-md bg-gray-300 px-4 py-2 text-sm font-medium text-white hover:bg-gray-500"
        >
          Edit course
        </Link>
        <Link
          to="/courses"
          className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Back to courses
        </Link>
      </div>
    </section>
  )
}

export default CourseDetail
