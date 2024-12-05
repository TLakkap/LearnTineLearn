import PropTypes from 'prop-types'

const ButtonList = ({ buttons, handleClick, isLoggedIn, handleDelete }) => {
    return (
        <>
            <div style={{ display: 'flex' }}>
                {buttons.length > 0 && buttons.map(b => (
                    <div style={{ display: 'inline-block' , margin: 5}} key={b.id}>
                        <button onClick={() => handleClick(b)} style={{
                                backgroundColor: '#e0f7e0', border: 'none',
                                borderBottom: '2px solid green',
                                padding: '10px 10px', cursor: 'pointer',
                                transition: 'background-color 0.3s'
                            }}>{b.name}</button>
                    </div>
                ))}
            </div>

            <div>
                {isLoggedIn && buttons.map(b => (
                    <button style={{ color: 'red', margin: 5 }} key={b.id} onClick={() => handleDelete(b)}>{`Delete ${b.name}`}</button>
                ))}
            </div>
        </>
    );
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