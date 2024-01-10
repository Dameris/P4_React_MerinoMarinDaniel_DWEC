import logo from "../images/logo.png"
import "../index.css"
import { FaSistrix } from "react-icons/fa"
import { FaUserAlt } from "react-icons/fa"
import { FaAlignJustify } from "react-icons/fa"
import { NavLink, Link, useNavigate } from "react-router-dom"
import { useUserContext } from "../context/UserContext"

function header() {

    const { user, setUser, favs, setFavs, loged, setLoged } = useUserContext()
    const navigate = useNavigate()

    const cerrarSesion = () => {
        setLoged(false)
        localStorage.setItem(user + "favs", favs)
        setFavs(null)
        navigate("/")
    }

    return (
        <header>
            <Link to="/"><img className="logoHeader" src={logo} alt="Acceso a página de inicio" /></Link>
            <nav className="navHeader">
                <ul className="btnsHeader">
                    <li><NavLink to="/">Inicio</NavLink></li>
                    <li><NavLink to="/algo">Algo</NavLink></li>
                    <li><NavLink to="/contact">Contacto</NavLink></li>
                </ul>
            </nav>
            <ul className="iconsHeader">
                {loged ? (
                    <ul className="btnsHeader">
                        <li className="liLogged"><NavLink to="/myFavs">Favoritos</NavLink></li>
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