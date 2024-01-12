import React, { useState } from "react"

export default function SignUp() {
  const [user, setUser] = useState({
    email: "",
    username: "",
    password: "",
    birthday: ""
  })

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
      setUser({
        email: "",
        username: "",
        password: "",
        birthday: ""
      })
    }
  }

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">
          <input type="email" id="email" name="email" placeholder="Email" value={user.email} onChange={handleChange} required />
        </label>
        <label htmlFor="user">
          <input type="text" id="user" name="username" placeholder="User" minLength={4} maxLength={20} value={user.username} onChange={handleChange} required />
        </label>
        <label htmlFor="password">
          <input type="password" id="password" name="password" placeholder="Password" minLength={8} maxLength={20} value={user.password} onChange={handleChange} required />
        </label>
        <label htmlFor="birthday">
          <input type="date" id="birthday" name="birthday" value={user.birthday} onChange={handleChange} required />
        </label>
        <label htmlFor="terms">
          <input type="checkbox" id="terms" name="terms" /> I agree to the terms and conditions
        </label>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  )
}