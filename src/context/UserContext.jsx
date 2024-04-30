import React, { createContext, useContext, useEffect, useState } from "react"

const UserContext = createContext()

const initializeDatabase = () => {
	return new Promise((resolve, reject) => {
		const request = window.indexedDB.open("userData", 1)

		request.onerror = (event) => {
			console.error("Error opening IndexedDB:", event.target.error)
			reject(event.target.error)
		}

		request.onsuccess = (event) => {
			const db = event.target.result
			resolve(db)
		}

		request.onupgradeneeded = (event) => {
			const db = event.target.result
			const objectStore = db.createObjectStore("users", { keyPath: "username" })
			objectStore.createIndex("username", "username", { unique: true })
		}
	})
}

const UserProvider = ({ children }) => {
	const [user, setUser] = useState({
		username: "",
		email: "",
		favorites: [],
	})
	const [logged, setLogged] = useState(false)

	useEffect(() => {
		initializeDatabase()
			.then((db) => {
				const transaction = db.transaction("users", "readwrite")
				const objectStore = transaction.objectStore("users")
				const getUserRequest = objectStore.get(localStorage.getItem("loggedUser"))

				getUserRequest.onsuccess = (event) => {
					setUser(event.target.result)
					setLogged(true)
				}

				getUserRequest.onerror = (event) => {
					console.error("Error retrieving user:", event.target.error)
				}
			})
			.catch((error) => {
				console.error("Error initializing IndexedDB:", error)
			})
	}, [])

	const addUser = (userData) => {
		setUser(userData)
		setLogged(true)
		localStorage.setItem("loggedUser", userData.username)

		// Cargar favoritos del usuario desde IndexedDB
		initializeDatabase()
			.then((db) => {
				const transaction = db.transaction("users", "readwrite")
				const objectStore = transaction.objectStore("users")
				const getUserRequest = objectStore.get(userData.username)

				getUserRequest.onsuccess = (event) => {
					const userWithFavorites = event.target.result
					if (userWithFavorites) {
						setUser(userWithFavorites)
					}
				}

				getUserRequest.onerror = (event) => {
					console.error("Error retrieving user with favorites:", event.target.error)
				}
			})
			.catch((error) => {
				console.error("Error initializing IndexedDB:", error)
			})
	}

	const updateFavorites = (newFavorites) => {
		setUser((prevUser) => ({
			...prevUser,
			favorites: newFavorites,
		}))

		initializeDatabase()
			.then((db) => {
				const transaction = db.transaction("users", "readwrite")
				const objectStore = transaction.objectStore("users")
				const updateUserRequest = objectStore.put(user)

				updateUserRequest.onerror = (event) => {
					console.error("Error updating user:", event.target.error)
				}
			})
			.catch((error) => {
				console.error("Error initializing IndexedDB:", error)
			})
	}

	return (
		<UserContext.Provider value={{ user, setUser, logged, setLogged, addUser, updateFavorites }}>
			{children}
		</UserContext.Provider>
	)
}

export default UserProvider
export const useUserContext = () => useContext(UserContext)
