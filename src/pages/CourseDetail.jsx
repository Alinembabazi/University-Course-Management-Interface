import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Loader from '../components/Loader'
import { getCourseById } from '../services/courseService'
import { getErrorMessage, normalizeCourse } from '../utils/helpers'

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
        const payload = await getCourseById(id)
        setCourse(normalizeCourse(payload?.course || payload?.data || payload))
      } catch (fetchError) {
        setError(getErrorMessage(fetchError, 'Unable to load the course details.'))
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
      <div className="rounded-3xl border border-rose-200 bg-white p-6 shadow-sm">
        <p className="text-sm text-rose-600">{error}</p>
      </div>
    )
  }

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-600">
        Course detail
      </p>
      <h2 className="mt-2 text-3xl font-bold text-slate-900">{course?.title}</h2>
      <p className="mt-3 text-sm leading-7 text-slate-600">
        {course?.description || 'No course description is available.'}
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Code</p>
          <p className="mt-2 text-lg font-semibold text-slate-900">{course?.code}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
            Instructor
          </p>
          <p className="mt-2 text-lg font-semibold text-slate-900">
            {course?.instructor}
          </p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
            Semester
          </p>
          <p className="mt-2 text-lg font-semibold text-slate-900">
            {course?.semester}
          </p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
            Credits
          </p>
          <p className="mt-2 text-lg font-semibold text-slate-900">
            {course?.credits}
          </p>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          to={`/courses/${course?.id}/edit`}
          className="rounded-2xl bg-slate-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-700"
        >
          Edit course
        </Link>
        <Link
          to="/courses"
          className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
        >
          Back to courses
        </Link>
      </div>
    </section>
  )
}

export default CourseDetail
