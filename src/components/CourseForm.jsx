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
      <div className="space-y-4">
        <label className="block text-sm font-medium text-slate-700">
          Course name
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
