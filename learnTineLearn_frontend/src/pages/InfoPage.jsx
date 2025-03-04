import PropTypes from 'prop-types'
import AddNewForm from '../components/AddNewForm'
import { addNewInfo } from '../api'

const InfoPage = ({ info, handleGetInfo, selectedTopic, selectedCourse, isLoggedIn }) => {

  const addNew = (event, newInfo) => {
    event.preventDefault()
    console.log('Add new info:', newInfo)
    addNewInfo(selectedCourse.id, selectedTopic.id, newInfo)
      .then(response => {
        console.log(response)
        // TODO: Show added info or text "new info has been saved"
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }

  return(
    <>
      {/*<h2>{selectedTopic.name}</h2>*/}
      <h3>{info.info}</h3>
      <button onClick={() => handleGetInfo(selectedTopic)}
        style={{
          backgroundColor: '#e63946',
          color: '#fff',
          border: '1px solid #fff',
          borderRadius: '5px',
          padding: '5px 10px',
          fontSize: '14px',
          cursor: 'pointer',
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)'
        }}>Next</button>
      {isLoggedIn ? ( <AddNewForm addNew={addNew} /> ) : ( null )}
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
    id: PropTypes.number,
    name: PropTypes.string
  }),
  selectedCourse: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string
  }),
  isLoggedIn: PropTypes.bool
}

export default InfoPage