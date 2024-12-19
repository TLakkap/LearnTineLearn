import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
})

api.interceptors.request.use((config) => {
  const token = window.localStorage.getItem('loggedInUser')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, (error) => {
  return Promise.reject(error);
})

//API-functions

export const getCourses = () => {
  return api.get(`/courses`)
}

export const getTopics = (courseId) => {
  return api.get(`/courses/${courseId}/topics`)
}

export const getInfo = (courseId, topicId) => {
  return api.get(`/courses/${courseId}/topics/${topicId}`)
}

export const deleteCourse = (courseId) => {
  return api.delete(`/courses/${courseId}`)
}

export const addNewCourse = (courseName) => {
  return api.post(`/courses`, { name: courseName })
}

export const addNewTopic = (courseId, topicName) => {
  return api.post(`/courses/${courseId}/topics`, { name: topicName })
}

export const addNewInfo = (courseId, topicId, newInfo) => {
  return api.post(`/courses/${courseId}/topics/${topicId}`, { topicId: topicId, info: newInfo })
}