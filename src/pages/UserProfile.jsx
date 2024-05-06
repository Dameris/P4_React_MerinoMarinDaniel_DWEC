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

		const request = window.indexedDB.open("userData", 1)

		request.onerror = (event) => {
			console.error("Error opening IndexedDB:", event.target.error)
		}

		request.onsuccess = (event) => {
			const db = event.target.result
			const transaction = db.transaction("users", "readonly")
			const objectStore = transaction.objectStore("users")
			const getUserRequest = objectStore.get(username)

			getUserRequest.onsuccess = (event) => {
				const userData = event.target.result

				if (userData) {
					setUser(userData)
				} else {
					console.error("User not found in IndexedDB")
				}
			}

			getUserRequest.onerror = (event) => {
				console.error("Error retrieving user from IndexedDB:", event.target.error)
			}
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
					<p>Username: {user.username} </p>
					<p>Email: {user.email} </p>
					<p>Birthday: {formatDate(user.birthday)}</p>
				</div>
			</div>
		</div>
	)
}

export default UserProfile
