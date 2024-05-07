import React, { createContext, useContext, useEffect, useState } from "react"

const UserContext = createContext()

const UserProvider = ({ children }) => {
	const [user, setUser] = useState({
		username: "",
		email: "",
		favorites: [],
	})
	const [logged, setLogged] = useState(false)
	const [dbInitialized, setDbInitialized] = useState(false)

	useEffect(() => {
		const initializeDatabase = async () => {
			try {
				const request = window.indexedDB.open("userData", 1)
				request.onerror = (event) => {
					console.error("Error opening IndexedDB:", event.target.error)
					throw new Error(event.target.error)
				}
				request.onsuccess = (event) => {
					const db = event.target.result
					setDbInitialized(true)
					const loggedInUser = localStorage.getItem("loggedUser")
					if (loggedInUser) {
						const transaction = db.transaction("users", "readwrite")
						const objectStore = transaction.objectStore("users")
						const getUserRequest = objectStore.get(loggedInUser)

						getUserRequest.onsuccess = (event) => {
							setUser(event.target.result)
							setLogged(true)
						}

						getUserRequest.onerror = (event) => {
							console.error("Error retrieving user:", event.target.error)
						}
					}
				}
				request.onupgradeneeded = (event) => {
					const db = event.target.result
					db.createObjectStore("users", { keyPath: "username" })
				}
			} catch (error) {
				console.error("Error initializing IndexedDB:", error)
			}
		}

		initializeDatabase()
	}, [])

	const addUser = (userData) => {
		setUser(userData)
		setLogged(true)
		localStorage.setItem("loggedUser", userData.username)
	}

	const updateFavorites = (newFavorites) => {
		setUser((prevUser) => ({
			...prevUser,
			favorites: newFavorites,
		}))

		const loggedInUser = localStorage.getItem("loggedUser")
		if (loggedInUser && dbInitialized) {
			const request = window.indexedDB.open("userData", 1)
			request.onsuccess = (event) => {
				const db = event.target.result
				const transaction = db.transaction("users", "readwrite")
				const objectStore = transaction.objectStore("users")
				objectStore.put(user)
			}
			request.onerror = (event) => {
				console.error("Error opening IndexedDB:", event.target.error)
			}
		}
	}

	if (!dbInitialized) {
		return <div>Loading...</div>
	}

	return (
		<UserContext.Provider value={{ user, setUser, logged, setLogged, addUser, updateFavorites }}>
			{children}
		</UserContext.Provider>
	)
}

export default UserProvider
export const useUserContext = () => useContext(UserContext)
