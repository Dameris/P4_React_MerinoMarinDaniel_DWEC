import logo from "../images/logo.png"
import "../index.css"
import { FaUserAlt } from "react-icons/fa"
import { NavLink, Link, useNavigate } from "react-router-dom"
import { useUserContext } from "../context/UserContext"

function header() {
    const { user, setUser, logged, setLogged } = useUserContext()
    const navigate = useNavigate()

    const cerrarSesion = () => {
        setLogged(false)
        localStorage.setItem(user)
        navigate("/")
    }

    return (
        <header>
            <Link to="/"><img className="logoHeader" src={logo} alt="Acceso a página de inicio" /></Link>
            <nav className="navHeader">
                <ul className="btnsHeader">
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="/favAnime">Favourites</NavLink></li>
                    <li><NavLink to="/contact">Contact</NavLink></li>
                </ul>
            </nav>
            <ul className="iconsHeader">
                {logged ? (
                    <ul className="btnsHeader">
                        <li className="liLogged"><NavLink to="/userProfile">Profile</NavLink></li>
                        <li onClick={cerrarSesion}>Logout</li>
                    </ul>
                ) : (
                    <li><NavLink to="/login"><FaUserAlt /></NavLink></li>
                )}
            </ul>
        </header>
    )
}
export default header