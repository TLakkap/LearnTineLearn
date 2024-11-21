import { useEffect, useState } from 'react'
import axios from 'axios'
import CourseList from './components/CourseList'

const url = '/api/'

function App() {
  const [courses, setCourses] = useState([])
  /*const [newInfo, setNewInfo] = useState('')
  const [info, setInfo] = useState('')
  const [infoId, setInfoId] = useState()
  const [message, setMessage] = useState(null)*/

  useEffect(() => {
    console.log('effect')
    axios
      .get(url + 'courses').then(response => {
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

  const handleCourseClick = (courseName) => {
    console.log('Valittu kurssi:', courseName);
  };

  return (
    <div>
      <CourseList courses={courses} handleCourseClick={handleCourseClick} />
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
