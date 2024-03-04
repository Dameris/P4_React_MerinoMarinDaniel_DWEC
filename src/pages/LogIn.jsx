import React, { useState } from "react"
import { Navigate, NavLink } from "react-router-dom"
import { useUserContext } from "../context/UserContext"
import logo from "../images/logo.png"

export default function LogIn() {
	const [user, setUser] = useState({
		email: "",
		username: "",
		password: "",
		birthday: "",
	})

	const [error, setError] = useState("")
	const { setLogged } = useUserContext()
	const [redirect, setRedirect] = useState(false)

	// Manejar cambios en el formulario
	const handleChange = (e) => {
		const { name, value } = e.target
		setUser({ ...user, [name]: value })
	}

	// Manejar los datos enviados
	const handleSubmit = (e) => {
		e.preventDefault()

		const storedUsers = JSON.parse(localStorage.getItem("users")) || []
		const userExists = storedUsers.find(
			(existingUser) =>
				existingUser.username === user.username && existingUser.password === user.password
		)

		if (!userExists) {
			setError("Incorrect username or password")
		} else {
			localStorage.setItem("loggedUser", user.username)

			setLogged(true)
			setRedirect(true)
		}
	}

	if (redirect) {
		return <Navigate to="/" />
	}

	return (
		<div className="logInWallpaper">
			<img
				className="mainLogo"
				src={logo}
				alt="Main Logo"
			/>
			<form
				onSubmit={handleSubmit}
				className="formLogIn"
			>
				<div className="logInBlock">
					<label htmlFor="user">
						<input
							className="login"
							type="text"
							name="username"
							placeholder="Username"
							value={user.username}
							onChange={handleChange}
						/>
					</label>
					<label htmlFor="password">
						<input
							className="login"
							type="password"
							name="password"
							placeholder="Password"
							value={user.password}
							onChange={handleChange}
						/>
					</label>
					{error && <p>{error}</p>}
					<button
						className="submitLogIn"
						type="submit"
						name="submit"
					>
						Log In
					</button>
					<NavLink
						to="/signup"
						className="navLink"
					>
						Don't have an account? Sign Up!
					</NavLink>
				</div>
			</form>
		</div>
	)
}
