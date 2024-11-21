import PropTypes from 'prop-types';

const CourseList = (props) => {
    return (
        <>
            <h1>Kurssit</h1>
            <div>
            {props.courses.length === 0 ? (
                <p>Kursseja ei löytynyt.</p>
            ) : (
                props.courses.map((course) => (
                <button
                    key={course.id}
                    onClick={() => props.handleCourseClick(course.courseName)}
                >
                    {course.courseName}
                </button>
                ))
            )}
            </div>
        </>
    )
}

CourseList.propTypes = {
courses: PropTypes.arrayOf(
    PropTypes.shape({
    id: PropTypes.number.isRequired,
    courseName: PropTypes.string.isRequired,
    })
).isRequired,
handleCourseClick: PropTypes.func.isRequired,
}
  
export default CourseList