import PropTypes from 'prop-types'
import CourseList from '../components/CourseList'
import Button from '../components/Button'
import AddNewForm from '../components/AddNewForm'

const Home = (props) => {
    return (
        <div>
            {props.selectedCourse === null ? (
                <CourseList courses={props.courses} handleClick={props.handleCourseClick} />
            ) : (
                <>
                <h2>{props.selectedCourse.name}</h2>
                <CourseList courses={props.topics} handleClick={props.handleTopicClick} />
                </>
            )}
        <AddNewForm addNew={props.addNew} />
        <Button label='Go back' handleClick={() => props.handleGoBack()} />
        </div>
    )
}

Home.propTypes = {
    selectedCourse: PropTypes.object,
    courses: PropTypes.array,
    handleCourseClick: PropTypes.func,
    topics: PropTypes.array,
    handleTopicClick: PropTypes.func,
    addNew: PropTypes.func,
    handleGoBack: PropTypes.func
}

export default Home