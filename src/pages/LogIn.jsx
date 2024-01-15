import React, { useState } from "react"
import { Navigate, NavLink } from "react-router-dom"
import { useUserContext } from "../context/UserContext"

export default function LogIn() {
  const [user, setUser] = useState({
    email: "",
    username: "",
    password: "",
    birthday: ""
  })
  const [error, setError] = useState("")
  const { setLogged } = useUserContext()
  const [redirect, setRedirect] = useState(false)

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target
    setUser({ ...user, [name]: value })
  };

  // Manejar los datos enviados
  const handleSubmit = (e) => {
    e.preventDefault()

    const storedUsers = JSON.parse(localStorage.getItem("users")) || []
    const userExists = storedUsers.some((existingUser) => existingUser.username === user.username)
    const passwordExists = storedUsers.some((existingUser) => existingUser.password === user.password)

    if (!userExists || !passwordExists) {
      setError("Incorrect username or password")
    } else {
      setLogged(true)
      setRedirect(true)
    }
  }

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <h2>Log In</h2>
      <form onSubmit={handleSubmit}>
        <label>
          User:
          <input type="text" name="username" value={user.username} onChange={handleChange} />
        </label>
        <label>
          Password:
          <input type="password" name="password" value={user.password} onChange={handleChange} />
        </label>
        {error && <p>{error}</p>}
        <button type="submit">Log In</button>
        <NavLink to="/signup" className="navLink">Don't have an account? Sign Up!</NavLink>
      </form>
    </div>
  )
}