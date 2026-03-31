import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import CourseForm from '../components/CourseForm'
import Loader from '../components/Loader'
import { getCourseById, updateCourse } from '../services/courseService'
import {
  buildCoursePayload,
  getErrorMessage,
  getUnauthorizedMessage,
  normalizeCourse,
} from '../utils/helpers'

const initialValues = {
  title: '',
  code: '',
  instructor: '',
  credits: '',
  semester: '',
  description: '',
}

function EditCourse() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState(initialValues)
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    async function fetchCourse() {
      setLoading(true)

      try {
        const payload = await getCourseById(id)
        const course = normalizeCourse(payload?.course || payload?.data || payload)
        setFormData({
          title: course.title,
          code: course.code,
          instructor: course.instructor,
          credits: course.credits,
          semester: course.semester,
          description: course.description,
        })
      } catch (fetchError) {
        if (fetchError?.response?.status === 401) {
          toast.error(getUnauthorizedMessage())
        } else {
          toast.error(getErrorMessage(fetchError, 'Unable to load course.'))
        }
        navigate('/courses')
      } finally {
        setLoading(false)
      }
    }

    fetchCourse()
  }, [id, navigate])

  function handleChange(event) {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setIsSubmitting(true)

    try {
      await updateCourse(id, buildCoursePayload(formData))
      toast.success('Course updated successfully.')
      navigate(`/courses/${id}`)
    } catch (updateError) {
      if (updateError?.response?.status === 401) {
        toast.error(getUnauthorizedMessage())
      } else {
        toast.error(getErrorMessage(updateError, 'Unable to update course.'))
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return <Loader message="Loading course form..." />
  }

  return (
    <div className="space-y-5">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-600">
          Edit
        </p>
        <h2 className="mt-2 text-2xl font-bold text-slate-900">Update course</h2>
      </div>

      <CourseForm
        values={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        submitLabel="Save changes"
      />
    </div>
  )
}

export default EditCourse
