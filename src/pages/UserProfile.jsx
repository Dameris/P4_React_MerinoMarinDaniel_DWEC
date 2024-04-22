import React, { useEffect, useState } from "react"
import pfp from "../assets/images/pfp.jpg"

const UserProfile = () => {
	const [user, setUser] = useState({
		email: "",
		username: "",
		birthday: "",
	})

	useEffect(() => {
		const username = localStorage.getItem("loggedUser")

		const storedUsers = JSON.parse(localStorage.getItem("users")) || []
		const currentUser = storedUsers.find((existingUser) => existingUser.username === username)

		if (currentUser) {
			setUser(currentUser)
		}
	}, [])

	// Función para formatear la fecha en mm/dd/yyyy
	const formatDate = (dateString) => {
		const date = new Date(dateString)
		return date.toLocaleDateString("en-US")
	}

	return (
		<div className="userProfile">
			<div className="pfInfo">
				<img
					className="defaultPfp"
					src={pfp}
					alt="Profile"
				/>
				<div className="userInfoBox">
					<p>
						Username: {user.username} <br />
					</p>
					<p>
						Email: {user.email} <br />
					</p>
					<p>Birthday: {formatDate(user.birthday)}</p>
				</div>
			</div>
		</div>
	)
}

export default UserProfile
