import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import axios from "axios"

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleNavigate = () => {
        console.log("Navigating to homepage")
        navigate(`/`)
    }

    const handleLogin = (event) => {
        event.preventDefault()
        console.log('logging in with', username)
        axios
            .post('/api/auth/login', {username: username, password: password})
            .then(response => {
                console.log(response)
                //Save token to local storage
                window.localStorage.setItem(
                    'loggedInUser', JSON.stringify(response.data)
                )
                handleNavigate()
            })
            .catch(error => {
                console.log(error)
            })
    }

    return(
        <>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    username
                    <input
                    type="text"
                    value={username}
                    name="Username"
                    onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                    password
                    <input
                    type="password"
                    value={password}
                    name="Password"
                    onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button type="submit">login</button>
            </form>
        </>
    )
}

export default Login