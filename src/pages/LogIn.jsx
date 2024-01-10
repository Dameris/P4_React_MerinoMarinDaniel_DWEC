import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import logo from "../images/logo.png"
import { useUserContext } from "../context/UserContext"



export default function LogIn() {
  const { user, setUser, loged, setLoged, favs, setFavs } = useUserContext()
  const navigate = useNavigate()

  const loginUser = (e) => {
    e.preventDefault()

    if (localStorage.hasOwnProperty(e.target.user.value + "favs")) {
      setUser(e.target.user.value)
      setFavs(localStorage.getItem(e.target.user.value + "favs").split(","))
      setLoged(true)
      navigate("/")
    } else {
      setUser(e.target.user.value)
      setFavs([])
      setLoged(true)
      navigate("/")
    }
  }

  return (
    <div className='mainSesion'>
      <img className="mainLogo" src={logo} alt="Main Logo" />
      <form className="formSesion" onSubmit={loginUser}>
        <label htmlFor="user">
          <input className="sesion" type="text" id="user" name="user" placeholder="User" required />
        </label>
        <label htmlFor="password">
          <input className="sesion" type="password" id="password" name="password" placeholder="Password" required />
        </label>
        <button type="submit" className="submitBtn">Login</button>
        <NavLink to="/singup" className={"navLink"}>¿No tienes cuenta? ¡Regístrate!</NavLink>
      </form>
    </div>
  )
}