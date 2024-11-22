import PropTypes from 'prop-types'
import Button from './Button'

const CourseList = (props) => {
    
    const handleClick = (name) => {
        props.courses.map((course) => {
            if (course.name === name) {
                console.log('Selected course:', course.name)
                props.handleClick(course)
            }  
        })
    }

    return (
        <>
            <h1>Aiheet</h1>
            <div>
                {props.courses.map((course) => (
                    <Button key={course.id} label={course.name} handleClick={handleClick} 
                    />
                ))}
            </div>
        </>
    )
}

CourseList.propTypes = {
courses: PropTypes.arrayOf(
    PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    })
).isRequired,
handleClick: PropTypes.func.isRequired,
}
  
export default CourseList