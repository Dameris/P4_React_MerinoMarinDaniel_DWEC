import React, { useState } from "react"
import { Navigate } from "react-router"
import logo from "../images/logo.png"

export default function SignUp() {
  const [user, setUser] = useState({
    email: "",
    username: "",
    password: "",
    birthday: ""
  })
  const [redirect, setRedirect] = useState(false)

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target
    setUser({ ...user, [name]: value })
  }

  // Manejar los datos enviados
  const handleSubmit = (e) => {
    e.preventDefault()

    const storedUsers = localStorage.getItem("users")
    const users = storedUsers ? JSON.parse(storedUsers) : []
    const newUser = { ...user }
    const userExists = users.some((existingUser) => existingUser.username === newUser.username)
    const emailExist = users.some((existingEmail) => existingEmail.email === newUser.email)

    if (userExists) {
      alert("Username already exists")
    } else if (emailExist) {
      alert("Email already exists")
    } else {
      users.push(newUser)
      localStorage.setItem("users", JSON.stringify(users))

      setRedirect(true)
    }
  }

  if (redirect) {
    return <Navigate to="/logIn" />
  }

  return (
    <div className="signUpWallpaper">
      <img className="mainLogo" src={logo} alt="Main Logo" />
      <form onSubmit={handleSubmit} className="formSignUp">
        <div className="signUpBlock">
          <label htmlFor="email">
            <input className="signup" type="email" id="email" name="email" placeholder="Email" value={user.email} onChange={handleChange} required />
          </label>
          <label htmlFor="user">
            <input className="signup" type="text" id="user" name="username" placeholder="User" minLength={4} maxLength={20} value={user.username} onChange={handleChange} required />
          </label>
          <label htmlFor="password">
            <input className="signup" type="password" id="password" name="password" placeholder="Password" minLength={8} maxLength={20} value={user.password} onChange={handleChange} required />
          </label>
          <label htmlFor="birthday">
            <input className="signup" type="date" id="birthday" name="birthday" value={user.birthday} onChange={handleChange} required />
          </label>
          <label htmlFor="terms">
            <input type="checkbox" id="terms" name="terms" required /> I agree terms and conditions
          </label>
          <button className="submitSignUp" type="submit">Sign Up</button>
        </div>
      </form>
    </div>
  )
}