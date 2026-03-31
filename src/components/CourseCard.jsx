import { Link } from 'react-router-dom'

function CourseCard({ course, onDelete }) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-600">
            {course.code || 'Course'}
          </p>
          <h3 className="mt-2 text-xl font-bold text-slate-900">
            {course.title || 'Untitled course'}
          </h3>
        </div>
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
          {course.credits || 0} credits
        </span>
      </div>

      <div className="mt-4 space-y-2 text-sm text-slate-600">
        <p>Instructor: {course.instructor || 'Not assigned'}</p>
        <p>Semester: {course.semester || 'Not set'}</p>
        <p>Students: {course.studentsCount}</p>
      </div>

      <p className="mt-4 text-sm leading-6 text-slate-500">
        {course.description || 'No course description is available yet.'}
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          to={`/courses/${course.id}`}
          className="rounded-2xl bg-gray-300 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-400"
        >
          View
        </Link>
        <Link
          to={`/courses/${course.id}/edit`}
          className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-medium text-gray-300 transition hover:bg-gray-200"
        >
          Edit
        </Link>
        <button
          type="button"
          onClick={() => onDelete(course)}
          className="rounded-2xl border border-rose-200 px-4 py-2 text-sm font-medium text-rose-600 transition hover:bg-rose-50"
        >
          Delete
        </button>
      </div>
    </article>
  )
}

export default CourseCard
