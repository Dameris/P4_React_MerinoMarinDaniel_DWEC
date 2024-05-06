import React, { useState } from "react"
import { Navigate } from "react-router"
import { useUserContext } from "../context/UserContext"
import Logo from "../assets/images/Logo.png"

export default function SignUp() {
	const { addUser } = useUserContext()
	const [user, setUser] = useState({
		email: "",
		username: "",
		password: "",
		birthday: "",
		favorites: [],
	})

	const [formErrors, setFormErrors] = useState({
		emailError: false,
		usernameError: false,
		passwordError: false,
		birthdayError: false,
	})

	const [redirect, setRedirect] = useState(false)

	// Manejo de errores en el formulario
	const validateEmail = () => {
		const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/
		setFormErrors({ ...formErrors, emailError: !emailPattern.test(user.email) })
	}

	const validateUsername = () => {
		const namePattern = /^[A-Za-zÀ-ÿ0-9\s]{4,}$/
		setFormErrors({ ...formErrors, usernameError: !namePattern.test(user.username) })
	}

	const validatePassword = () => {
		const lengthRegex = /.{8,}/
		const upperCaseRegex = /[A-Z]/
		const specialCharRegex = /[*, +, -, ., @, #, %, &, _, ~, ^, /, <, >]/

		const hasLength = lengthRegex.test(user.password)
		const hasUpperCase = upperCaseRegex.test(user.password)
		const hasSpecialChar = specialCharRegex.test(user.password)

		setFormErrors({ ...formErrors, passwordError: !hasLength || !hasUpperCase || !hasSpecialChar })
	}

	const validateBirthday = () => {
		const birthdayDate = new Date(user.birthday)
		const actualDate = new Date()
		const actualDay = actualDate.getDate()
		const actualMonth = actualDate.getMonth() + 1
		const actualYear = actualDate.getFullYear()

		const minDate = new Date("1900-01-01")
		const maxDate = new Date(`${actualYear}-${actualMonth}-${actualDay}`)

		const isValidDate = birthdayDate >= minDate && birthdayDate <= maxDate

		setFormErrors({ ...formErrors, birthdayError: !isValidDate })
	}

	// Manejar cambios en el formulario
	const handleChange = (e) => {
		const { name, value } = e.target
		setUser({ ...user, [name]: value })
	}

	// Manejar los datos enviados
	const handleSubmit = (e) => {
		e.preventDefault()

		validateEmail()
		validateUsername()
		validatePassword()
		validateBirthday()

		// Comprobar si hay errores
		if (formErrors.emailError || formErrors.usernameError || formErrors.passwordError) {
			alert("All input fields must contain valid information.")
		} else {
			alert("Form submitted successfully!")

			// Agregar el nuevo usuario a IndexedDB
			const request = window.indexedDB.open("userData", 1)

			request.onerror = (event) => {
				console.error("Error opening IndexedDB:", event.target.error)
			}

			request.onsuccess = (event) => {
				const db = event.target.result
				const transaction = db.transaction("users", "readwrite")
				const objectStore = transaction.objectStore("users")
				const addUserRequest = objectStore.add(user)

				addUserRequest.onsuccess = (event) => {
					console.log("User added successfully to IndexedDB")
					addUser(user)
					setRedirect(true)
				}

				addUserRequest.onerror = (event) => {
					console.error("Error adding user to IndexedDB:", event.target.error)
				}
			}

			setRedirect(true)
		}
	}

	if (redirect) {
		return <Navigate to="/login" />
	}

	return (
		<div className="signUpWallpaper">
			<img
				className="mainLogo"
				src={Logo}
				alt="Main Logo"
			/>
			<form
				onSubmit={handleSubmit}
				className="formSignUp"
			>
				<div className="signUpBlock">
					<label htmlFor="email">
						<input
							className="signup"
							type="email"
							id="email"
							name="email"
							placeholder="Email"
							value={user.email}
							onChange={handleChange}
							onBlur={validateEmail}
							required
						/>
					</label>
					{formErrors.emailError && (
						<span className="error__message">Please enter a valid email address</span>
					)}

					<label htmlFor="user">
						<input
							className="signup"
							type="text"
							id="user"
							name="username"
							placeholder="User"
							value={user.username}
							onChange={handleChange}
							onBlur={validateUsername}
							required
						/>
					</label>
					{formErrors.usernameError && (
						<span className="error__message">Please enter a valid username (4+ characters)</span>
					)}

					<label htmlFor="password">
						<input
							className="signup"
							type="password"
							id="password"
							name="password"
							placeholder="Password"
							value={user.password}
							onChange={handleChange}
							onBlur={validatePassword}
							required
						/>
					</label>
					{formErrors.passwordError && (
						<span className="error__message">
							Please enter a valid password (8+ characters, 1+ uppercase and 1+ special character)
						</span>
					)}

					<label htmlFor="birthday">
						<input
							className="signup"
							type="date"
							id="birthday"
							name="birthday"
							value={user.birthday}
							onChange={handleChange}
							onBlur={validateBirthday}
							required
						/>
					</label>
					{formErrors.birthdayError && (
						<span className="error__message">Please enter a valid date</span>
					)}

					<label htmlFor="terms">
						<input
							type="checkbox"
							id="terms"
							name="terms"
							required
						/>{" "}
						I agree terms and conditions
					</label>

					<button
						className="submitSignUp"
						type="submit"
					>
						Sign Up
					</button>
				</div>
			</form>
		</div>
	)
}
