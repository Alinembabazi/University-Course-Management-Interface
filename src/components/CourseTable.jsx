import { Link } from 'react-router-dom'

function CourseTable({ courses, onDelete }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              {['Code', 'Title', 'Instructor', 'Semester', 'Credits', 'Actions'].map(
                (heading) => (
                  <th
                    key={heading}
                    className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-[0.2em] text-slate-500"
                  >
                    {heading}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {courses.map((course) => (
              <tr key={course.id} className="text-sm text-gray-700">
                <td className="px-4 py-4 font-semibold">{course.code || '--'}</td>
                <td className="px-4 py-4">{course.title || '--'}</td>
                <td className="px-4 py-4">{course.instructor || '--'}</td>
                <td className="px-4 py-4">{course.semester || '--'}</td>
                <td className="px-4 py-4">{course.credits || '--'}</td>
                <td className="px-4 py-4">
                  <div className="flex flex-wrap gap-2">
                    <Link
                      to={`/courses/${course.id}`}
                      className="rounded-xl bg-gray-300 px-3 py-2 text-xs font-medium text-white"
                    >
                      View
                    </Link>
                    <Link
                      to={`/courses/${course.id}/edit`}
                      className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-medium text-gray-700"
                    >
                      Edit
                    </Link>
                    <button
                      type="button"
                      onClick={() => onDelete(course)}
                      className="rounded-xl border border-rose-200 px-3 py-2 text-xs font-medium text-rose-600"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CourseTable
