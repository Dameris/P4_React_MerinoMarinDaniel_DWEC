import React, { useState } from "react"
import { Navigate } from "react-router"
import logo from "../images/logo.png"

export default function SignUp() {
	const [user, setUser] = useState({
		email: "",
		username: "",
		password: "",
		birthday: "",
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
		const namePattern = /^[A-Za-zÀ-ÿ\s]{2,}$/
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
		const minDate = new Date("1900-01-01")
		const maxDate = today.toISOString().slice(0, 10)

		const isValidDate = minDate < birthdayDate > maxDate

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
	}

	if (redirect) {
		return <Navigate to="/logIn" />
	}

	return (
		<div className="signUpWallpaper">
			<img
				className="mainLogo"
				src={logo}
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
					{formErrors.emailError && <span>Please enter a valid email address</span>}

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
					{formErrors.usernameError && <span>Please enter a valid username</span>}

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
					{formErrors.passwordError && <span>Please enter a valid password</span>}

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
