const inputStyles =
  'mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100'

function CourseForm({
  values,
  onChange,
  onSubmit,
  isSubmitting,
  submitLabel,
}) {
  return (
    <form
      onSubmit={onSubmit}
      className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <div className="grid gap-5 md:grid-cols-2">
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
        className="mt-6 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? 'Saving...' : submitLabel}
      </button>
    </form>
  )
}

export default CourseForm
