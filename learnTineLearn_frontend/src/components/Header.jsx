import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ButtonList from './ButtonList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';

const Header = (props) => {
    const [topicList, setTopicList] = useState([]);

    // get topics when selected course is changed
    useEffect(() => {
        if (props.selectedCourse) {
            props.handleGetTopics(props.selectedCourse).then((topics) => {
                console.log('Topics fetched in Header:', topics)
                setTopicList(topics)
            })
        }
    }, [props.selectedCourse])

    const handleTopicClick = (topic) => {
        console.log('Clicked topic:', topic.name)
        props.handleTopicClick(topic)
    }
    

    return (
        <>
            <h1 style={{backgroundColor: '#023e8a', color: '#95d5b2', fontFamily: 'Georgia', margin: 0, padding: 10 }}><FontAwesomeIcon icon={faBook} className="logo-icon" /> NoteBlogTML</h1>
            {props.isLoggedIn ? (<button onClick={props.handleLogout}>Logout</button>) : (null)}
            <div style={{ borderTop: '2px solid black', borderBottom: '2px solid black' }}>
                <ButtonList 
                    buttons={props.courses}
                    handleClick={props.handleCourseClick}
                    isLoggedIn={props.isLoggedIn}
                    handleDelete={props.handleDelete}
                    selected={props.selectedCourse}
                />
                {props.selectedCourse && (
                    <div style={{ borderTop: '2px solid black' }}>
                        <ButtonList 
                            buttons={topicList || []}
                            handleClick={(topic) => handleTopicClick(topic)}
                            selected={props.selectedTopic}
                        />
                    </div>
                )}
            </div>
        </>
    );
}

Header.propTypes = {
    isLoggedIn: PropTypes.bool,
    handleLogout: PropTypes.func,
    courses: PropTypes.array,
    handleCourseClick: PropTypes.func,
    handleDelete: PropTypes.func,
    selectedCourse: PropTypes.object,
    handleGetTopics: PropTypes.func,
    setSelectedTopic: PropTypes.func,
    handleTopicClick: PropTypes.func,
    selectedTopic: PropTypes.object
};

export default Header;
