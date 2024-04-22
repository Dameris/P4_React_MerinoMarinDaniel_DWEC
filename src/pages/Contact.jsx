import React, { useState } from "react"
import Logo from "../assets/images/Logo.png"

export default function Contact() {
	const [user, setUser] = useState({
		name: "",
		email: "",
		phone: "",
		problem: "",
	})

	const [formErrors, setFormErrors] = useState({
		nameError: false,
		emailError: false,
		phoneError: false,
		problemError: false,
	})

	// Manejo de errores en el formulario
	const validateName = () => {
		const namePattern = /^[A-Za-zÀ-ÿ\s]{2,}$/
		setFormErrors({ ...formErrors, nameError: !namePattern.test(user.name) })
	}

	const validateEmail = () => {
		const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/
		setFormErrors({ ...formErrors, emailError: !emailPattern.test(user.email) })
	}

	const validatePhone = () => {
		const phonePattern = /^\d{9}$/
		setFormErrors({ ...formErrors, phoneError: !phonePattern.test(user.phone) })
	}

	const validateProblem = () => {
		const problemLength = /.{8,}/
		setFormErrors({ ...formErrors, problemError: !problemLength.test(user.problem) })
	}

	// Manejar cambios en el formulario
	const handleChange = (e) => {
		const { name, value } = e.target
		setUser({ ...user, [name]: value })
	}

	// Manejar los datos enviados
	const handleSubmit = (e) => {
		e.preventDefault()

		validateName()
		validateEmail()
		validatePhone()
		validateProblem()

		// Comprobar si hay errores
		if (
			formErrors.nameError ||
			formErrors.emailError ||
			formErrors.phoneError ||
			formErrors.problemError
		) {
			alert("All input fields must contain valid information.")
		} else {
			alert("Form submitted successfully!")

			setUser({
				name: "",
				email: "",
				phone: "",
				problem: "",
			})

			setFormErrors({
				nameError: false,
				emailError: false,
				phoneError: false,
				problemError: false,
			})
		}
	}

	return (
		<div className="contactWallpaper">
			<img
				className="mainLogo"
				src={Logo}
				alt="Main Logo"
			/>
			<form
				className="formContact"
				onSubmit={handleSubmit}
			>
				<div className="formBlock">
					<label htmlFor="name">
						<input
							className="contact"
							type="text"
							id="name"
							name="name"
							placeholder="Name"
							value={user.name}
							onChange={handleChange}
							onBlur={validateName}
							required
						/>
					</label>
					{formErrors.nameError && (
						<span className="error__message">Please enter a valid name</span>
					)}

					<label htmlFor="email">
						<input
							className="contact"
							type="text"
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

					<label htmlFor="phone">
						<input
							className="contact"
							type="text"
							id="phone"
							name="phone"
							placeholder="Phone"
							value={user.phone}
							onChange={handleChange}
							onBlur={validatePhone}
							required
						/>
					</label>
					{formErrors.phoneError && (
						<span className="error__message">Please enter a valid phone number</span>
					)}

					<label htmlFor="problem">
						<textarea
							id="problem"
							name="problem"
							placeholder="Problem description"
							value={user.problem}
							onChange={handleChange}
							onBlur={validateProblem}
							required
						/>
					</label>
					{formErrors.problemError && (
						<span className="error__message">Please enter a problem description</span>
					)}

					<input
						className="submit"
						type="submit"
						name="submit"
						value="Submit"
					/>
				</div>
			</form>
		</div>
	)
}
