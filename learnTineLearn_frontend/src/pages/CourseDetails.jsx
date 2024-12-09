import PropTypes from 'prop-types'
import ButtonList from '../components/ButtonList'
import AddNewForm from '../components/AddNewForm'
import axios from 'axios'

const CourseDetails = (props) => {
    const handleTopicClick = (topicName) => {
        console.log('Valittu aihe:', topicName)
    }

    const addNew = (event, newName) => {
        event.preventDefault()
        const token = window.localStorage.getItem("loggedInUser")
        console.log('Add new topic:', newName)
        axios
          .post(`/api/courses/${props.selectedCourse.id}/topics`, {name: newName},
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            })
          .then(response => {
            console.log(response)
            props.setTopics([...props.topics, response.data])
          })
          .catch((error) => {
            console.error('Error:', error)
          })
    }


    return (
        <div>
            <ButtonList buttons={props.topics} handleClick={handleTopicClick} />    
            {props.isLoggedIn ? (
            <>
                <AddNewForm addNew={addNew} />
                <button onClick={props.handleLogout}>Logout</button>
            </>
            ) : (
                null
            )}
        </div>
    )
}


CourseDetails.propTypes = {
    topics: PropTypes.array,
    setTopics: PropTypes.func,
    isLoggedIn: PropTypes.bool,
    handleLogout: PropTypes.func,
    selectedCourse: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string
    })
}

export default CourseDetails