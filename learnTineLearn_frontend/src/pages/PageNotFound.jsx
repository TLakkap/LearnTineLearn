import { useNavigate } from "react-router-dom"

const PageNotFound = () => {
    const navigate = useNavigate()

    return (
        <div>
            <h2>404 Not Found</h2>
            <p>The page you are looking for does not exist.</p>
            <button onClick={() => navigate("/")}>Go back to home page</button>
        </div>
    )
}

export default PageNotFound