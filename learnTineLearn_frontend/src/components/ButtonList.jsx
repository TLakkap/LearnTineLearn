import PropTypes from 'prop-types'
import Button from './Button'

const ButtonList = ({ buttons, handleClick }) => {
    
    const handleListClick = (text) => {
        //Find the correct object based on the button's text
        buttons.map(b => {
            if (b.name === text) {
                console.log(`Clicked button ${b.name} from list`)
                handleClick(b)
            }
        })
    }

    return (
        <div>
            {buttons.map(b => (
                <Button key={b.id} label={b.name} handleClick={handleListClick} />
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
).isRequired,
handleClick: PropTypes.func.isRequired,
}
  
export default ButtonList