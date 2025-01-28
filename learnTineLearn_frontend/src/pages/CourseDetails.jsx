import PropTypes from 'prop-types'
import { addNewTopic } from '../api'
//import ButtonList from '../components/ButtonList'
import AddNewForm from '../components/AddNewForm'

const CourseDetails = (props) => {
  /*const handleTopicClick = (topic) => {
    console.log('Valittu aihe:', topic.name)
    props.handleTopicClick(topic)
  }*/

  const addNew = (event, newName) => {
    event.preventDefault()
    console.log('Add new topic:', newName)
    addNewTopic(props.selectedCourse.id, newName)
      .then(response => {
        console.log('Course added:', response.data);
        props.setTopics([...props.topics, response.data]);
      })
      .catch(error => {
        console.error('Error adding course:', error);
      })
  }


  return (
    <div>
      {/*<ButtonList buttons={props.topics} handleClick={handleTopicClick} />*/} 
      {props.isLoggedIn ? ( <AddNewForm addNew={addNew} /> ) : ( null )}
    </div>
  )
}


CourseDetails.propTypes = {
  topics: PropTypes.array,
  setTopics: PropTypes.func,
  isLoggedIn: PropTypes.bool,
  handleLogout: PropTypes.func,
  handleTopicClick: PropTypes.func,
  selectedCourse: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string
  })
}

export default CourseDetails