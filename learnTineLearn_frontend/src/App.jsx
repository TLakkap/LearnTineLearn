import { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from "react-router-dom"
import { getCourses, getTopics, getInfo, deleteCourse } from './api'
import { ToastContainer } from "react-toastify"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Home from './pages/Home'
import CourseDetails from './pages/CourseDetails'
import PageNotFound from './pages/PageNotFound'
import Login from './pages/Login'
import InfoPage from './pages/InfoPage'
import Header from './components/Header'

function App() {
  const navigate = useNavigate()
  const [courses, setCourses] = useState([])
  const [topics, setTopics] = useState([])
  const [info, setInfo] = useState({})
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [selectedTopic, setSelectedTopic] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  //const token = window.localStorage.getItem("loggedInUser")

  useEffect(() => {
    console.log('Fetching courses from server...')
    getCourses()
      .then(response => {
        setCourses(response.data)
      })
      .catch(
        toast.error("Error while fetching courses from server. Please, try again.")
      )
  }, [])

  useEffect(() => {
    // Check if token is in local storage
    setIsLoggedIn(!!window.localStorage.getItem("loggedInUser")) // Boolean
  }, [])

  const handleCourseClick = (course) => {
    setSelectedCourse(course)
    setSelectedTopic(null)
    navigate(`/${course.name}`)
  }

  const handleTopicClick = (topic) => {
    // return if course is not selected
    if (!selectedCourse) return
    // if course selected continue to topic selection
    setSelectedTopic(topic)
    handleGetInfo(topic)
    navigate(`/${selectedCourse.name}/${topic.name}`)
  }

  const handleGetTopics = async (course) => {
    // return empty array if course is not provided
    if (!course) return []
    try {
        const response = await getTopics(course.id)
        setTopics(response.data)
        return response.data
    } catch (error) {
        console.error('Error fetching topics:', error)
        return []
    }
  }

  const handleGetInfo = async (topic) => {
    // return if course is not selected or topic is not provided
    if (!selectedCourse || !topic) return
    try {
      const response = await getInfo(selectedCourse.id, topic.id)
      setInfo(response.data)
    } catch (error) {
        console.error('Error fetching info:', error)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem("loggedInUser")
    setIsLoggedIn(false)
    console.log("User logged out")
  }

  const handleDelete = async (deletedCourse) => {
    // return if deletedCourse not provided
    if (!deletedCourse) return
    try {
      await deleteCourse(deletedCourse.id)
      setCourses(prevCourses =>
        prevCourses.filter(course => course.id !== deletedCourse.id))
      console.log("Course deleted successfully")
    } catch (error) {
      console.error("Error while deleting course:", error)
    }
  }

  /*const handleUpdate = (event, updatedCourse) => {
    event.preventDefault()
    console.log('Update:', updatedCourse)
    axios
      .put(`$api/courses/${updatedCourse.id}`)
      .then(response => {
        console.log(response)
      })
      .catch((error) => {
        console.log('Error:', error)
      })
  }*/

  return (
    <div style={{ backgroundColor: '#f4f4f9', minHeight: '100vh', fontFamily: 'Arial' }}>
      <ToastContainer />
      <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} courses={courses} handleCourseClick={handleCourseClick}
        handleDelete={handleDelete} selectedCourse={selectedCourse} setSelectedCourse={setSelectedCourse} handleGetTopics={handleGetTopics} handleTopicClick={handleTopicClick} setSelectedTopic={setSelectedTopic} selectedTopic={selectedTopic} />
      <Routes>
        <Route path="/" element={<Home 
          courses={courses} 
          setCourses={setCourses} 
          isLoggedIn={isLoggedIn} />} />
        <Route path="/:courseName" element={<CourseDetails
          topics={topics}
          setTopics={setTopics}
          isLoggedIn={isLoggedIn}
          handleLogout={handleLogout}
          selectedCourse={selectedCourse}
          handleTopicClick={handleTopicClick} />} />
        <Route path="/:courseName/:topicName" element={<InfoPage info={info} handleGetInfo={handleGetInfo} selectedTopic={selectedTopic} selectedCourse={selectedCourse} isLoggedIn={isLoggedIn} />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="*" element={<PageNotFound /> } />
      </Routes>
    </div>
  )
}

export default App
