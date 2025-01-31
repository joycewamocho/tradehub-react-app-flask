import { useNavigate } from "react-router-dom"
function Logout(){
    const navigate= useNavigate();
    function handleLogout(){
        localStorage.removeItem("user")
        navigate("/login")
    }
    return(
        <div>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )

}

export default Logout