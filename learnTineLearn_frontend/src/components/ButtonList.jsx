import PropTypes from 'prop-types'

const ButtonList = ({ buttons, handleClick, isLoggedIn, handleDelete }) => {

    return (
        <div>
            {buttons.length > 0 && buttons.map(b => (
                <div key={b.id}>
                    <button onClick={() => handleClick(b)}>{b.name}</button>
                    {isLoggedIn && <button onClick={() => handleDelete(b)}>{`Delete ${b.name}`}</button> }
                </div>
            ))}
        </div>
    )
}

ButtonList.propTypes = {
buttons: PropTypes.arrayOf(
    PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    })
),
handleClick: PropTypes.func.isRequired,
isLoggedIn: PropTypes.bool,
handleDelete: PropTypes.func
}
  
export default ButtonList