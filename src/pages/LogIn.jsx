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
	const handleSubmit = async (e) => {
		e.preventDefault()

		// Abrir la base de datos IndexedDB
		const request = window.indexedDB.open("userData", 1)

		request.onerror = (event) => {
			console.error("Error opening IndexedDB:", event.target.error)
		}

		request.onsuccess = (event) => {
			const db = event.target.result
			const transaction = db.transaction("users", "readonly")
			const objectStore = transaction.objectStore("users")
			const getUserRequest = objectStore.get(user.username)

			getUserRequest.onsuccess = async (event) => {
				const userData = event.target.result

				// Verificar la validez del usuario y contraseña
				if (userData) {
					try {
						const encoder = new TextEncoder()
						const data = encoder.encode(user.password)
						const hashBuffer = await crypto.subtle.digest("SHA-256", data)
						const hashArray = Array.from(new Uint8Array(hashBuffer))
						const hashedPassword = hashArray
							.map((byte) => byte.toString(16).padStart(2, "0"))
							.join("")

						if (userData.password === hashedPassword) {
							localStorage.setItem("loggedUser", user.username)
							setLogged(true)
							addUser(userData)
							setRedirect(true)
						} else {
							setError("Incorrect username or password")
						}
					} catch (error) {
						console.error("Error hashing password:", error)
					}
				} else {
					setError("User not found")
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
			{/* Formulario de inicio de sesión */}
			<form
				onSubmit={handleSubmit}
				className="formLogIn"
			>
				<div className="logInBlock">
					<label htmlFor="user">
						<input
							className="login"
							type="text"
							autoComplete="Username"
							id="user"
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
							id="password"
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
