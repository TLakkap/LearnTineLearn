import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import axios from 'axios'
import Home from './pages/Home'

const url = '/api'

function App() {
  const [courses, setCourses] = useState([])
  const [topics, setTopics] = useState([])
  const [selectedCourse, setSelectedCourse] = useState(null)

  useEffect(() => {
    console.log('effect')
    axios
      .get(`${url}/courses`).then(response => {
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

  const handleCourseClick = (course) => {
    console.log('Valittu kurssi:', course)
    setSelectedCourse(course)
    console.log('id:', course.id)
    axios.get(`${url}/courses/${course.id}/topics`).then(response => {
      console.log(response.data)
      setTopics(response.data)
    }) 
  }

  const handleTopicClick = (topicName) => {
    console.log('Valittu aihe:', topicName)
  }

  const addNew = (event, newName) => {
    event.preventDefault()
    console.log('Add new:', newName)
    axios
      .post(`${url}/courses`, {name: newName})
      .then(response => {
        console.log(response)
        setCourses([...courses, response.data])
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }

  const handleGoBack = () => {
    setTopics([])
    setSelectedCourse(null)
  }

  return (
    <Router>
            <Routes>
                <Route path="/" element={<Home selectedCourse={selectedCourse} courses={courses} handleCourseClick={handleCourseClick}
                topics={topics} handleTopicClick={handleTopicClick}  addNew={addNew} handleGoBack={handleGoBack} />} />
                {/*<Route path="/:courseName" element={<CourseDetails />} />*/}
            </Routes>
    </Router>
  )
}

export default App
