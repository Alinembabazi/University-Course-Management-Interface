import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import CourseForm from '../components/CourseForm'
import { useAuth } from '../hooks/useAuth'
import { createCourse, createLocalCourse } from '../services/courseService'
import {
  buildCoursePayload,
  getCourseId,
  getErrorMessage,
} from '../utils/helpers'

const initialValues = {
  title: '',
  description: '',
}

function CreateCourse() {
  const navigate = useNavigate()
  const { user, updateApiToken } = useAuth()
  const [formData, setFormData] = useState(initialValues)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [apiTokenInput, setApiTokenInput] = useState(user?.apiToken || '')

  function handleChange(event) {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setIsSubmitting(true)

    try {
      if (apiTokenInput.trim()) {
        updateApiToken(apiTokenInput)
      }

      const payload = await createCourse(buildCoursePayload(formData))
      const createdCourseId = getCourseId(payload?.course || payload?.data || payload)

      toast.success('Course created successfully.')
      navigate(createdCourseId ? `/courses/${createdCourseId}` : '/courses')
    } catch (createError) {
      if (createError?.response?.status === 401) {
        const localCourse = createLocalCourse(buildCoursePayload(formData))
        toast.success('Course saved locally. Add an API token to sync with the backend.')
        navigate(`/courses/${getCourseId(localCourse)}`)
      } else {
        toast.error(getErrorMessage(createError, 'Unable to create course.'))
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-semibold text-slate-900">Create course</h2>
        <p className="mt-1 text-sm text-slate-600">
          Add only the course name and description.
        </p>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-4">
        <label className="block text-sm font-medium text-slate-700">
          API token
          <input
            type="text"
            value={apiTokenInput}
            onChange={(event) => setApiTokenInput(event.target.value)}
            placeholder="Required if your backend is protected"
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
          />
        </label>
      </div>

      <CourseForm
        values={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        submitLabel="Create course"
      />
    </div>
  )
}

export default CreateCourse
