import PropTypes from 'prop-types'
import { useState } from 'react'

const AddNewForm = (props) => {
    const [new1, setNew1] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()
        props.addNew(event, new1)
    }

    return(
        <form onSubmit={handleSubmit}>
            <label>
                New:
                <input
                type="text"
                value={new1}
                onChange={(e) => setNew1(e.target.value)}
                />
            </label>
            <button type='submit'>Save</button>
        </form>
    )
}

AddNewForm.propTypes = {
    addNew: PropTypes.func
}

export default AddNewForm