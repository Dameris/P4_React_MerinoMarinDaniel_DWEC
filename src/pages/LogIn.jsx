import React, { useState } from "react"
import { Navigate, NavLink } from "react-router-dom"
import { useUserContext } from "../context/UserContext"
import Logo from "../assets/images/Logo.png"

export default function LogIn() {
	const [user, setUser] = useState({
		username: "",
		password: "",
	})

	const [error, setError] = useState("")
	const { setLogged, addUser } = useUserContext()
	const [redirect, setRedirect] = useState(false)

	// Manejar cambios en el formulario
	const handleChange = (e) => {
		const { name, value } = e.target
		setUser({ ...user, [name]: value })
	}

	// Manejar los datos enviados
	const handleSubmit = (e) => {
		e.preventDefault()

		const request = window.indexedDB.open("userData", 1)

		request.onerror = (event) => {
			console.error("Error opening IndexedDB:", event.target.error)
		}

		request.onsuccess = (event) => {
			const db = event.target.result
			const transaction = db.transaction("users", "readonly")
			const objectStore = transaction.objectStore("users")
			const getUserRequest = objectStore.index("username").get(user.username)

			getUserRequest.onsuccess = (event) => {
				const userData = event.target.result

				if (userData && userData.password === user.password) {
					localStorage.setItem("loggedUser", user.username)
					setLogged(true)
					addUser(userData)
					setRedirect(true)
				} else {
					setError("Incorrect username or password")
				}
			}

			getUserRequest.onerror = (event) => {
				console.error("Error retrieving user from IndexedDB:", event.target.error)
				setError("Error retrieving user data")
			}
		}
	}

	if (redirect) {
		return <Navigate to="/" />
	}

	return (
		<div className="logInWallpaper">
			<img
				className="mainLogo"
				src={Logo}
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
					{error && <p className="error__message">{error}</p>}
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
