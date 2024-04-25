import Logo from "../assets/images/Logo.png"
import "../index.css"
import { FaUserAlt } from "react-icons/fa"
import { NavLink, Link, useNavigate } from "react-router-dom"
import { useUserContext } from "../context/UserContext"

function header() {
    const { logged, setLogged } = useUserContext()
    const navigate = useNavigate()

    const logout = () => {
        setLogged(false)
        navigate("/")
    }

    return (
        <header>
            <Link to="/"><img className="logoHeader" src={Logo} alt="Acceso a página de inicio" /></Link>
            <nav className="navHeader">
                <ul className="btnsHeader">
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="/favorites">Favorites</NavLink></li>
                    <li><NavLink to="/contact">Contact</NavLink></li>
                </ul>
            </nav>
            <ul className="iconsHeader">
                {logged ? (
                    <ul className="btnsHeader">
                        <li className="liLogged"><NavLink to="/userProfile">Profile</NavLink></li>
                        <li onClick={logout}>Logout</li>
                    </ul>
                ) : (
                    <li><NavLink to="/login"><FaUserAlt /></NavLink></li>
                )}
            </ul>
        </header>
    )
}
export default header