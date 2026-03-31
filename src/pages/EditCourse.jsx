import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import CourseForm from '../components/CourseForm'
import Loader from '../components/Loader'
import {
  getCourseById,
  getLocalCourseById,
  isLocalCourseId,
  updateCourse,
  updateLocalCourse,
} from '../services/courseService'
import {
  buildCoursePayload,
  getErrorMessage,
  getUnauthorizedMessage,
  normalizeCourse,
} from '../utils/helpers'

const initialValues = {
  title: '',
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
        const payload = isLocalCourseId(id)
          ? getLocalCourseById(id)
          : await getCourseById(id)
        const course = normalizeCourse(payload?.course || payload?.data || payload)
        setFormData({
          title: course.title,
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
      if (isLocalCourseId(id)) {
        updateLocalCourse(id, buildCoursePayload(formData))
      } else {
        await updateCourse(id, buildCoursePayload(formData))
      }
      toast.success('Course updated successfully.')
      navigate(`/courses/${id}`)
    } catch (updateError) {
      if (updateError?.response?.status === 401) {
        updateLocalCourse(id, buildCoursePayload(formData))
        toast.success('Course updated locally. Add an API token to sync with the backend.')
        navigate(`/courses/${id}`)
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
        <h2 className="text-2xl font-semibold text-slate-900">Edit course</h2>
        <p className="mt-1 text-sm text-slate-600">
          Update only the course name and description.
        </p>
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
