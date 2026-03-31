import { useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import ConfirmModal from '../components/ConfirmModal'
import CourseCard from '../components/CourseCard'
import Loader from '../components/Loader'
import { useCourses } from '../hooks/useCourses'
import { deleteCourse, deleteLocalCourse, isLocalCourseId } from '../services/courseService'
import { getErrorMessage } from '../utils/helpers'

function Dashboard() {
  const { courses, loading, error, refreshCourses } = useCourses()
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const metrics = useMemo(
    () => [
      { label: 'Total courses', value: courses.length },
      {
        label: 'Unique instructors',
        value: new Set(courses.map((course) => course.instructor).filter(Boolean))
          .size,
      },
      {
        label: 'Average credits',
        value:
          courses.length > 0
            ? (
                courses.reduce(
                  (total, course) => total + Number(course.credits || 0),
                  0,
                ) / courses.length
              ).toFixed(1)
            : '0.0',
      },
    ],
    [courses],
  )

  async function handleDelete() {
    if (!selectedCourse) {
      return
    }

    setIsDeleting(true)

    try {
      if (isLocalCourseId(selectedCourse.id)) {
        deleteLocalCourse(selectedCourse.id)
      } else {
        await deleteCourse(selectedCourse.id)
      }
      toast.success('Course deleted successfully.')
      setSelectedCourse(null)
      refreshCourses()
    } catch (deleteError) {
      if (deleteError?.response?.status === 401) {
        deleteLocalCourse(selectedCourse.id)
        toast.success('Course deleted locally. Add an API token to sync with the backend.')
        setSelectedCourse(null)
        refreshCourses()
      } else {
        toast.error(getErrorMessage(deleteError, 'Unable to delete course.'))
      }
    } finally {
      setIsDeleting(false)
    }
  }

  if (loading) {
    return <Loader message="Loading dashboard..." />
  }

  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-3">
        {metrics.map((metric) => (
          <article
            key={metric.label}
            className="rounded-lg border border-slate-300 bg-white p-5 text-slate-900"
          >
            <p className="text-sm text-slate-500">{metric.label}</p>
            <p className="mt-2 text-2xl font-semibold text-gray-300">{metric.value}</p>
          </article>
        ))}
      </section>

      <section className="rounded-lg border border-slate-300 bg-white p-6 text-slate-900">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Courses</h2>
          </div>
          <button
            type="button"
            onClick={refreshCourses}
            className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Refresh list
          </button>
        </div>

        {error ? (
          <p className="mt-6 rounded-md bg-amber-50 px-4 py-3 text-sm text-amber-800">
            {error}
          </p>
        ) : null}

        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onDelete={setSelectedCourse}
            />
          ))}
        </div>

        {courses.length === 0 && !error ? (
          <p className="mt-6 rounded-2xl bg-slate-50 px-4 py-6 text-center text-sm text-slate-500">
            No courses are available yet. Create your first course to get
            started.
          </p>
        ) : null}
      </section>

      <ConfirmModal
        isOpen={Boolean(selectedCourse)}
        title="Delete course"
        message={`Are you sure you want to delete "${
          selectedCourse?.title || 'this course'
        }"? This action cannot be undone.`}
        confirmLabel="Delete course"
        onConfirm={handleDelete}
        onCancel={() => setSelectedCourse(null)}
        isLoading={isDeleting}
      />
    </div>
  )
}

export default Dashboard
