import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import PropTypes from "prop-types"
import axios from "axios"
import ButtonList from "../components/ButtonList"
import AddNewForm from "../components/AddNewForm"

const Home = (props) => {
    const navigate = useNavigate()
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const token = window.localStorage.getItem("loggedInUser")

    useEffect(() => {
        // Check if token is in local storage
        const localStorageToken = window.localStorage.getItem("loggedInUser")
        setIsLoggedIn(!!localStorageToken) // Boolean
    }, [])

    const handleNavigate = (course) => {
        props.setSelectedCourse(course)
        console.log("Navigate to:", course)
        navigate(`/${course.name}`)
    }

    const handleLogout = () => {
        window.localStorage.removeItem("loggedInUser")
        setIsLoggedIn(false)
        console.log("User logged out")
    }

    const addNew = async (event, newName) => {
        event.preventDefault()

        try {
            const response = await axios.post(
                '/api/courses',
                { name: newName },
                {
                  headers: {
                    Authorization: `Bearer ${token}`
                  }
                }
              )
            console.log("Course added:", response.data)
            props.setCourses([...props.courses, response.data])
        } catch (error) {
            console.error("Error adding course:", error)
            setErrorMessage(error.response?.data?.message || "An error occurred")
        }
    }

    const handleDelete = (deletedCourse) => {
        console.log("Deleting course:", deletedCourse)
        axios
            .delete(`/api/courses/${deletedCourse.id}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then(response => {
                console.log("Course deleted successfully:", response)
                // update course list
                props.setCourses(prevCourses =>
                    prevCourses.filter(course => course.id !== deletedCourse.id)
                )
            })
            .catch(error => {
                console.error("Error while deleting course:", error)
            })
    }

    return (
        <div>
            <ButtonList buttons={props.courses} handleClick={handleNavigate} isLoggedIn={isLoggedIn} handleDelete={handleDelete} />
            {isLoggedIn ? (
                <>
                    <AddNewForm addNew={addNew} />
                    <button onClick={handleLogout}>Logout</button>
                </>
            ) : (
                null
            )}
            {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
        </div>
    )
}

Home.propTypes = {
    courses: PropTypes.array.isRequired,
    setCourses: PropTypes.func.isRequired,
    setSelectedCourse: PropTypes.func.isRequired,
};

export default Home;
