import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
})

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = window.localStorage.getItem('loggedInUser')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// handle all errors
const handleError = (error) => {
  console.error("API error:", error.response?.data?.message || error.message)
  throw error
}

// API-functions

export const getCourses = async () => {
  try {
    const response = await api.get(`/courses`)
    return response.data
  } catch (error) {
    handleError(error)
  }
}

export const getTopics = async (courseId) => {
  try {
    const response = await api.get(`/courses/${courseId}/topics`)
    return response.data
  } catch (error) {
    handleError(error)
  }
}

export const getInfo = async (courseId, topicId) => {
  try {
    const response = await api.get(`/courses/${courseId}/topics/${topicId}`)
    return response.data
  } catch (error) {
    handleError(error)
  }
}

export const deleteCourse = async (courseId) => {
  try {
    const response = await api.delete(`/courses/${courseId}`)
    return response.data
  } catch (error) {
    handleError(error)
  }
}

export const addNewCourse = async (courseName) => {
  try {
    const response = await api.post(`/courses`, { name: courseName })
    return response.data
  } catch (error) {
    handleError(error)
  }
}

export const addNewTopic = async (courseId, topicName) => {
  try {
    const response = await api.post(`/courses/${courseId}/topics`, { name: topicName })
    return response.data
  } catch (error) {
    handleError(error)
  }
}

export const addNewInfo = async (courseId, topicId, newInfo) => {
  try {
    const response = await api.post(`/courses/${courseId}/topics/${topicId}`, { topicId, info: newInfo })
    return response.data
  } catch (error) {
    handleError(error)
  }
}
