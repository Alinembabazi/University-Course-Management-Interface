const inputStyles =
  'mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-slate-500'

function CourseForm({
  values,
  onChange,
  onSubmit,
  isSubmitting,
  submitLabel,
}) {
  return (
    <form onSubmit={onSubmit} className="rounded-lg border border-slate-200 bg-white p-6">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block text-sm font-medium text-slate-700">
          Course title
          <input
            required
            name="title"
            value={values.title}
            onChange={onChange}
            className={inputStyles}
            placeholder="Introduction to Algorithms"
          />
        </label>

        <label className="block text-sm font-medium text-slate-700">
          Course code
          <input
            required
            name="code"
            value={values.code}
            onChange={onChange}
            className={inputStyles}
            placeholder="CSC 401"
          />
        </label>

        <label className="block text-sm font-medium text-slate-700">
          Instructor
          <input
            required
            name="instructor"
            value={values.instructor}
            onChange={onChange}
            className={inputStyles}
            placeholder="Dr. Ada Lovelace"
          />
        </label>

        <label className="block text-sm font-medium text-slate-700">
          Credits
          <input
            required
            min="1"
            type="number"
            name="credits"
            value={values.credits}
            onChange={onChange}
            className={inputStyles}
            placeholder="3"
          />
        </label>

        <label className="block text-sm font-medium text-slate-700 md:col-span-2">
          Semester
          <input
            required
            name="semester"
            value={values.semester}
            onChange={onChange}
            className={inputStyles}
            placeholder="First Semester 2026"
          />
        </label>

        <label className="block text-sm font-medium text-slate-700 md:col-span-2">
          Description
          <textarea
            required
            rows="5"
            name="description"
            value={values.description}
            onChange={onChange}
            className={inputStyles}
            placeholder="Briefly describe the purpose, outcomes, and structure of the course."
          />
        </label>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-6 rounded-md bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-70"
      >
        {isSubmitting ? 'Saving...' : submitLabel}
      </button>
    </form>
  )
}

export default CourseForm
