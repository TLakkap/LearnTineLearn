import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import axios from 'axios'
import Home from './pages/Home'
import CourseDetails from './pages/CourseDetails'
import PageNotFound from './pages/PageNotFound'
import Login from './pages/Login'

function App() {
  const [selectedCourse, setSelectedCourse] = useState()
  const [courses, setCourses] = useState([])
  const [token, setToken] = useState()

  useEffect(() => {
      console.log('Get courses from server')
      axios
        .get(`/api/courses`).then(response => {
          console.log(response.data)
          setCourses(response.data)
        })
  }, [])

  useEffect(() => {
    const loggedIn = window.localStorage.getItem('loggedInUser')
     if (loggedIn) {
      const token = JSON.parse(loggedIn)
      setToken(token)
    }
  }, [])

  const handleUpdate = (event, updatedCourse) => {
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
  }

  const handleDelete = (deletedCourse) => {
    console.log("Delete course:", deletedCourse)
    axios
      .delete(`api/courses/${deletedCourse.id}`)
      .then(response => {
        console.log(response)
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }


  return (
    <Router>
            <Routes>
                <Route path="/" element={<Home courses={courses} setCourses={setCourses} setSelectedCourse={setSelectedCourse} token={token} />} />
                <Route path="/:courseName" element={<CourseDetails courses={courses} selectedCourse={selectedCourse} />} />
                <Route path='/auth/login' element={<Login />} />
                <Route path="*" element={<PageNotFound /> } />
            </Routes>
    </Router>
  )
}

export default App
