import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import ButtonList from '../components/ButtonList'
import AddNewForm from '../components/AddNewForm'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'

const CourseDetails = (props) => {
    const { courseName } = useParams()
    const navigate = useNavigate()
    const [topics, setTopics] = useState([])
    const [error, setError] = useState(null)
    const [selectedCourse, setSelectedCourse] = useState(props.selectedCourse)

    useEffect(() => {
        console.log('effect in topics')
        console.log("Selected course initially:", selectedCourse)
        if (!selectedCourse && props.courses.length >0) {
            setSelectedCourse(props.courses.find(course => course.name.toLowerCase() === courseName.toLowerCase()))
            console.log("Selected course adter lookup:", selectedCourse)
            if (!selectedCourse) {
                console.log(`Course "${courseName}" not found`)
                setError(`Course "${courseName}" not found`);
            }
        }

        if(selectedCourse) {
            axios
              .get(`/api/courses/${selectedCourse.id}/topics`)
              .then(response => {
                console.log('response topics:', response)
                setTopics(response.data)
            })
              .catch(error => {
                console.error('Error fetching topics:', error)
            })
        }
    }, [courseName, selectedCourse, props.courses])

    if (error) {
        return (
            <div>
                <h2>Error</h2>
                <p>{error}</p>
                <button onClick={() => navigate("/")}>Go back to home page</button>
            </div>
        );
    }

    const handleTopicClick = (topicName) => {
        console.log('Valittu aihe:', topicName)
    }

    const addNew = (event, newName) => {
        event.preventDefault()
        console.log('Add new topic:', newName)
        axios
          .post(`/api/courses/${props.selectedCourse.id}/topics`, {name: newName})
          .then(response => {
            console.log(response)
            setTopics([...topics, response.data])
          })
          .catch((error) => {
            console.error('Error:', error)
          })
    }

    
    if (selectedCourse) {
        return (
            <div>
                <h2>{courseName}</h2>
                <ButtonList courses={topics} handleClick={handleTopicClick} />    
                <AddNewForm addNew={addNew} />
            </div>
        )
    }

}

CourseDetails.propTypes = {
    courses: PropTypes.array,
    selectedCourse: PropTypes.object
}

export default CourseDetails