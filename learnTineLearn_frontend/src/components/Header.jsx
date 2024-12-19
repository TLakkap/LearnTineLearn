import PropTypes from 'prop-types'
import ButtonList from './ButtonList'

const Header = (props) => {

    return(
        <>
            {props.isLoggedIn ? (<button onClick={props.handleLogout}>Logout</button> ) : ( null )}
            <div style={{ borderTop: '2px solid black', borderBottom: '2px solid black' }}>
                <ButtonList 
                    buttons={props.courses}
                    handleClick={props.handleCourseClick}
                    isLoggedIn={props.isLoggedIn}
                    handleDelete={props.handleDelete}
                    selected={props.selectedCourse}
                />
                {props.selectedCourse && (
                    <ButtonList 
                        buttons={props.selectedCourse.topics || []} 
                        handleClick={(topic) => props.setSelectedTopic(topic)} 
                        selected={props.selectedTopic}
                    />
                )}
            </div>
        </>
    )
}

Header.propTypes = {
    isLoggedIn: PropTypes.bool,
    handleLogout: PropTypes.func,
    courses: PropTypes.array,
    handleCourseClick: PropTypes.func,
    handleDelete: PropTypes.func,
    selectedCourse: PropTypes.object,
    setSelectedTopic: PropTypes.func,
    selectedTopic: PropTypes.object
}

export default Header