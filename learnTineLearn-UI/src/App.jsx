import { useEffect, useState } from 'react'
import axios from 'axios'
import CourseList from './components/CourseList'
import Button from './components/Button'

const url = '/api/'

function App() {
  const [courses, setCourses] = useState([])
  const [topics, setTopics] = useState([])
  const [selectedCourse, setSelectedCourse] = useState(null)
  /*const [newInfo, setNewInfo] = useState('')
  const [info, setInfo] = useState('')
  const [infoId, setInfoId] = useState()
  const [message, setMessage] = useState(null)*/

  useEffect(() => {
    console.log('effect')
    axios
      .get(url + 'courses').then(response => {
        console.log(response.data)
        setCourses(response.data)
      })
  }, [])

  /*const handleSubmit = (e) => {
    e.preventDefault();

    fetch(url+'new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ info: newInfo }),
    })
      .then((response) => {
        if(response.status === 201) setMessage('Created')
        else setMessage('Failed to create info')    
        //setMessage(message)
        setNewInfo('')
      })
      .catch((error) => {
        console.error('Virhe:', error);
      });
  };

  const handleClick = () => {
    console.log("clicked")
    axios.get(url + '52/')
    //axios.get(url + '/courses')
      .then(res => {
        console.log("Axios response:", res)
        console.log("Axios response data;", res.data)
        setInfo(res.data.info)
        setInfoId(res.data.id)
      })
      .catch((error) => {
        console.error('Virhe:', error);
      })
  }

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

  const handleCourseClick = (course) => {
    console.log('Valittu kurssi:', course)
    setSelectedCourse(course.id)
    console.log('id:', course.id)
    axios.get(url + 'courses/' + course.id + '/topics').then(response => {
      console.log(response.data)
      setTopics(response.data)
    }) 
  }

  const handleTopicClick = (topicName) => {
    console.log('Valittu aihe:', topicName)
  }

  const handleGoBack = () => {
    setTopics([])
    setSelectedCourse(null)
  }

  return (
    <div>
      {selectedCourse === null ? (
        <CourseList courses={courses} handleClick={handleCourseClick} />
      ) : (
        <CourseList courses={topics} handleClick={handleTopicClick} />
      )}
      <Button label='Go back' handleClick={() => handleGoBack()} /> {/* DEVELOPMENT, testing only*/} 
      {/*<CourseList courses={courses} handleClick={handleCourseClick} />
      <CourseList courses={topics} handleClick={handleTopicClick} />*/}
      {/*<button onClick={() => handleClick()}>Show new info</button>
      <h2>{info}</h2>
      <button onClick={() => handleUpdate()}>Update</button>
      <button onClick={() => handleDelete()}>Delete</button>
      <h4>Save new</h4>
      <form onSubmit={handleSubmit}>
        <label>
          New:
          <input
            type="text"
            value={newInfo}
            onChange={(e) => setNewInfo(e.target.value)}
          />
        </label>
        <button type="submit">Save</button>
        <div>{message}</div>
      </form>*/}
    </div>
  );
}

export default App
