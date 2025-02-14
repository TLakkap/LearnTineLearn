import { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from "react-router-dom"
import { getCourses, getTopics, getInfo, deleteCourse } from './api'
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
  const token = window.localStorage.getItem("loggedInUser")

  useEffect(() => {
    console.log('Get courses from server')
    getCourses()
      .then(response => {
        console.log(response.data)
        setCourses(response.data)
      })
  }, [])

  useEffect(() => {
    // Check if token is in local storage
    const localStorageToken = window.localStorage.getItem("loggedInUser")
    setIsLoggedIn(!!localStorageToken) // Boolean
  }, [token])

  const handleCourseClick = (course) => {
    setSelectedCourse(course)
    setSelectedTopic(null)
    //handleGetTopics(course)
    navigate(`/${course.name}`)
  }

  const handleTopicClick = (topic) => {
    setSelectedTopic(topic)
    handleGetInfo(topic)
    console.log("Navigating to get info")
    navigate(`/${selectedCourse.name}/${topic.name}`)
  }

  const handleGetTopics = async (course) => {
    try {
        const response = await getTopics(course.id)
        console.log('response topics in App.jsx:', response);
        setTopics(response.data)
        return response.data
    } catch (error) {
        console.error('Error fetching topics:', error)
        return []
    }
};


  /*const handleGetTopics = (course) => {
    getTopics(course.id)
      .then(response => {
        console.log('response topics in App.jsx:', response)
        setTopics(response.data)
      })
      .catch(error => {
        console.error('Error fetching topics:', error)
      })
  }*/

  const handleGetInfo = (topic) => {
    getInfo(selectedCourse.id, topic.id)
      .then(response => {
        console.log('Response info from server: ', response)
        setInfo(response.data)
      })
      .catch(e => {
        console.error('Error fetching info:', e)
      })
  }

  const handleLogout = () => {
    window.localStorage.removeItem("loggedInUser")
    setIsLoggedIn(false)
    console.log("User logged out")
  }

  const handleDelete = (deletedCourse) => {
    console.log("Deleting course:", deletedCourse)
    deleteCourse(deletedCourse.id)
      .then(response => {
        console.log("Course deleted successfully:", response)
        // update course list
        setCourses(prevCourses =>
        prevCourses.filter(course => course.id !== deletedCourse.id)
      )
      })
      .catch(error => {
          console.error("Error while deleting course:", error)
      })
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
