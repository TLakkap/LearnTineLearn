import { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from "react-router-dom"
import axios from 'axios'
import Home from './pages/Home'
import CourseDetails from './pages/CourseDetails'
import PageNotFound from './pages/PageNotFound'
import Login from './pages/Login'
import ButtonList from "./components/ButtonList"
import AddNewForm from "./components/AddNewForm"
import InfoPage from './pages/InfoPage'

function App() {
  const navigate = useNavigate()
  const [courses, setCourses] = useState([])
  const [topics, setTopics] = useState([])
  const [info, setInfo] = useState('')
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [selectedTopic, setSelectedTopic] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const token = window.localStorage.getItem("loggedInUser")

  useEffect(() => {
    console.log('Get courses from server')
    axios
      .get(`/api/courses`).then(response => {
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
    handleGetTopics(course)
    navigate(`/${course.name}`)
  }

  const handleTopicClick = (topic) => {
    setSelectedTopic(topic)
    handleGetInfo(topic)
    console.log("Navigating to get info")
    navigate(`/${selectedCourse.name}/${topic.name}`)
  }

  const handleGetTopics = (course) => {
    axios
      .get(`/api/courses/${course.id}/topics`)
      .then(response => {
        console.log('response topics in App.jsx:', response)
        setTopics(response.data)
      })
      .catch(error => {
        console.error('Error fetching topics:', error)
      })
  }

  const handleGetInfo = (topic) => {
    axios
      .get(`/api/courses/${selectedCourse.id}/topics/${topic.id}`)
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

  const addNew = async (event, newName) => {
    event.preventDefault()

    try {
      const response = await axios.post(
        '/api/courses',
        { name: newName },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      console.log("Course added:", response.data)
      setCourses([...courses, response.data])
    } catch (error) {
        console.error("Error adding course:", error)
        setErrorMessage(error.response?.data?.message || "An error occurred")
    }
  }

  const handleDelete = (deletedCourse) => {
    console.log("Deleting course:", deletedCourse)
    axios
      .delete(`/api/courses/${deletedCourse.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
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
    <>
    <div style={{ borderTop: '2px solid black', borderBottom: '2px solid black' }}>
      <ButtonList 
        buttons={courses}
        handleClick={handleCourseClick}
        isLoggedIn={isLoggedIn}
        handleDelete={handleDelete}
        selected={selectedCourse}
      />
      {selectedCourse && (
        <div>
          <ButtonList 
            buttons={selectedCourse.topics || []} 
            handleClick={(topic) => setSelectedTopic(topic)} 
            selected={selectedTopic}
          />
        </div>
      )}
      {isLoggedIn ? (
        <>
            <AddNewForm addNew={addNew} />
            <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        null
      )}
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
    </div>
    <Routes>
        <Route path="/" element={<Home />} />
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
    </>
  )
}

export default App
