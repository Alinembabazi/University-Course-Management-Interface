import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import CourseForm from '../components/CourseForm'
import { createCourse } from '../services/courseService'
import { buildCoursePayload, getCourseId, getErrorMessage } from '../utils/helpers'

const initialValues = {
  title: '',
  code: '',
  instructor: '',
  credits: '',
  semester: '',
  description: '',
}

function CreateCourse() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState(initialValues)
  const [isSubmitting, setIsSubmitting] = useState(false)

  function handleChange(event) {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setIsSubmitting(true)

    try {
      const payload = await createCourse(buildCoursePayload(formData))
      const createdCourseId = getCourseId(payload?.course || payload?.data || payload)

      toast.success('Course created successfully.')
      navigate(createdCourseId ? `/courses/${createdCourseId}` : '/courses')
    } catch (createError) {
      toast.error(getErrorMessage(createError, 'Unable to create course.'))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-5">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-600">
          Create
        </p>
        <h2 className="mt-2 text-2xl font-bold text-slate-900">Add a new course</h2>
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
