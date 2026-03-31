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
  return {
    title: values.title.trim(),
    code: values.code.trim(),
    instructor: values.instructor.trim(),
    credits: Number(values.credits) || 0,
    semester: values.semester.trim(),
    description: values.description.trim(),
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
