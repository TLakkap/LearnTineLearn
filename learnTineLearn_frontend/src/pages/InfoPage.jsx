import PropTypes from 'prop-types'
import axios from 'axios'
import AddNewForm from '../components/AddNewForm'

const InfoPage = ({ info, handleGetInfo, selectedTopic, selectedCourse, isLoggedIn }) => {

    const addNew = (event, newInfo) => {
        event.preventDefault()
        const token = window.localStorage.getItem("loggedInUser")
        console.log('Add new info:', newInfo)
        axios
          .post(`/api/courses/${selectedCourse.id}/topics/${selectedTopic.id}`, {topicId: selectedTopic.id, info: newInfo},
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            })
          .then(response => {
            console.log(response)
            // TODO: Show added info / "new info has been saved"
          })
          .catch((error) => {
            console.error('Error:', error)
          })
    }

    return(
        <>
            <h3>{info.info}</h3>
            <button onClick={() => handleGetInfo(selectedTopic)}>Next</button>
            {isLoggedIn ? (
            <>
                <AddNewForm addNew={addNew} />
                {/*<button onClick={props.handleLogout}>Logout</button>*/}
            </>
            ) : (
                null
            )}
        </>
    )
}

InfoPage.propTypes = {
    info: PropTypes.shape({
        id: PropTypes.number.isRequired,
        info: PropTypes.string.isRequired,
    }),
    handleGetInfo: PropTypes.func.isRequired,
    selectedTopic: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired
    }),
    selectedCourse: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string
    }),
    isLoggedIn: PropTypes.bool
}

export default InfoPage