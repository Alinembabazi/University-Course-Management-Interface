export function getCourseId(course) {
  return course?._id || course?.id || ''
}

export function normalizeCourse(course = {}) {
  return {
    id: getCourseId(course),
    title: course.title || course.courseName || course.name || '',
    code: course.code || course.courseCode || '',
    instructor: course.instructor || course.lecturer || '',
    credits: String(course.credits || course.creditHours || ''),
    semester: course.semester || course.term || '',
    description: course.description || course.summary || '',
    studentsCount:
      course.studentsCount ||
      course.enrolledStudents ||
      course.students?.length ||
      0,
  }
}

export function buildCoursePayload(values) {
  const trimmedTitle = values.title.trim()
  const trimmedDescription = values.description.trim()
  const normalized = {
    title: trimmedTitle,
    code: values.code?.trim() || trimmedTitle.slice(0, 3).toUpperCase() || 'CRS',
    instructor: values.instructor?.trim() || 'TBA',
    credits: Number(values.credits) || 3,
    semester: values.semester?.trim() || 'TBA',
    description: trimmedDescription,
  }

  return {
    ...normalized,
    courseName: normalized.title,
    name: normalized.title,
    courseCode: normalized.code,
    lecturer: normalized.instructor,
    creditHours: normalized.credits,
    term: normalized.semester,
    summary: normalized.description,
  }
}

export function getErrorMessage(error, fallback = 'Something went wrong.') {
  return (
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    error?.message ||
    fallback
  )
}

export function getUnauthorizedMessage() {
  return 'This backend requires an API token. Add it during login so course requests can succeed.'
}
