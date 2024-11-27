import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import CourseList from '../components/CourseList'
import AddNewForm from '../components/AddNewForm'
import axios from 'axios'

const Home = (props) => {
    const navigate = useNavigate()

    const handleNavigate = (course) => {
        props.setSelectedCourse(course)
        console.log("Navigate to:", course)
        navigate(`/${course.name}`)
    }

    const addNew = (event, newName) => {
        event.preventDefault()
        console.log('Add new course:', newName)
        axios
          .post(`/api/courses`, {name: newName})
          .then(response => {
            console.log(response)
            props.setCourses([...props.courses, response.data])
          })
          .catch((error) => {
            console.error('Error:', error)
          })
    }

    return (
        <div>
            <CourseList courses={props.courses} handleClick={handleNavigate} />
            <AddNewForm addNew={addNew} />
        </div>
    )
}

Home.propTypes = {
    courses: PropTypes.array.isRequired,
    setCourses: PropTypes.func.isRequired,
    setSelectedCourse: PropTypes.func.isRequired
}

export default Home