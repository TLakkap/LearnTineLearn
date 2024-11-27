import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import axios from 'axios'
import Home from './pages/Home'
import CourseDetails from './pages/CourseDetails'
import PageNotFound from './pages/PageNotFound'

function App() {
  const [selectedCourse, setSelectedCourse] = useState()
  const [courses, setCourses] = useState([])

  useEffect(() => {
      console.log('Get courses from server')
      axios
        .get(`/api/courses`).then(response => {
          console.log(response.data)
          setCourses(response.data)
        })
  }, [])
  

  /*
  const handleUpdate = () => {
    console.log("update:", infoId, info)
    fetch(url+infoId, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: 'updatedTextHere',
    })
    .then((response) => {
      console.log(response)
      if(response.status === 200) setMessage('Updated')
      else setMessage('Failed to update info')    
      //setMessage(message)
    })
    .catch((error) => {
      console.error('Virhe:', error);
    })
  }

  const handleDelete = () => {
    console.log("delete:", infoId)
    fetch(url+infoId, {
      method: 'DELETE'
    })
    .then((response) => {
      if(response.status === 200) console.log('Deleted')
      else console.log('Failed to delete info')
      })
    .catch((error) => {
      console.error('Virhe:', error)
    })
  }*/
      
      {/*<button onClick={() => handleClick()}>Show new info</button>
      <h2>{info}</h2>
      <button onClick={() => handleUpdate()}>Update</button>
      <button onClick={() => handleDelete()}>Delete</button>
      */}

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
                <Route path="/" element={<Home courses={courses} setCourses={setCourses} setSelectedCourse={setSelectedCourse} />} />
                <Route path="/:courseName" element={<CourseDetails courses={courses} selectedCourse={selectedCourse} />} />
                <Route path="*" element={<PageNotFound /> } />
            </Routes>
    </Router>
  )
}

export default App
