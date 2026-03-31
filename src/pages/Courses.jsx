import { useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import ConfirmModal from '../components/ConfirmModal'
import CourseTable from '../components/CourseTable'
import Loader from '../components/Loader'
import { useCourses } from '../hooks/useCourses'
import { deleteCourse } from '../services/courseService'
import { getErrorMessage } from '../utils/helpers'

function Courses() {
  const { courses, loading, error, refreshCourses } = useCourses()
  const [query, setQuery] = useState('')
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const filteredCourses = useMemo(() => {
    const lowerCaseQuery = query.toLowerCase()

    return courses.filter((course) =>
      [course.title, course.code, course.instructor, course.semester]
        .join(' ')
        .toLowerCase()
        .includes(lowerCaseQuery),
    )
  }, [courses, query])

  async function handleDelete() {
    if (!selectedCourse) {
      return
    }

    setIsDeleting(true)

    try {
      await deleteCourse(selectedCourse.id)
      toast.success('Course deleted successfully.')
      setSelectedCourse(null)
      refreshCourses()
    } catch (deleteError) {
      toast.error(getErrorMessage(deleteError, 'Unable to delete course.'))
    } finally {
      setIsDeleting(false)
    }
  }

  if (loading) {
    return <Loader message="Loading courses..." />
  }

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-600">
              Course Directory
            </p>
            <h2 className="mt-2 text-2xl font-bold text-slate-900">
              Browse and manage all courses
            </h2>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by title, code, instructor..."
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100 sm:w-80"
            />
            <button
              type="button"
              onClick={refreshCourses}
              className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Refresh
            </button>
          </div>
        </div>

        {error ? (
          <p className="mt-6 rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-600">
            {error}
          </p>
        ) : (
          <div className="mt-6">
            <CourseTable courses={filteredCourses} onDelete={setSelectedCourse} />
          </div>
        )}
      </section>

      <ConfirmModal
        isOpen={Boolean(selectedCourse)}
        title="Delete course"
        message={`Delete "${selectedCourse?.title || 'this course'}" from the course catalog?`}
        confirmLabel="Delete"
        onConfirm={handleDelete}
        onCancel={() => setSelectedCourse(null)}
        isLoading={isDeleting}
      />
    </div>
  )
}

export default Courses
