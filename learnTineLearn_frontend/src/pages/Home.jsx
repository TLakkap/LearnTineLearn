import PropTypes from 'prop-types'
import { useState } from 'react'
import { addNewCourse } from '../api'
import AddNewForm from '../components/AddNewForm'

const Home = (props) => {
    const [errorMessage, setErrorMessage] = useState("")

    const addNew = async (event, newName) => {
        event.preventDefault()
        addNewCourse(newName)
            .then(response => {
                console.log("Course added:", response.data)
                props.setCourses([...props.courses, response.data])
            })
            .catch (error => {
                console.error("Error adding course:", error)
                setErrorMessage(error.response?.data?.message || "An error occurred")
            })          
      }

    return (
        <>
            <h1>Welcome</h1>
            <p>Please choose a topic</p>
            {props.isLoggedIn ? ( <AddNewForm addNew={addNew} /> ) : ( null )}
            {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
        </>
    )
}

Home.propTypes = {
    isLoggedIn: PropTypes.bool,
    setCourses: PropTypes.func,
    courses: PropTypes.array,
}

export default Home;
