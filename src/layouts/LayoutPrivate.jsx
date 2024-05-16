import React, { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { useUserContext } from "../context/UserContext"
import Header from "../shared/Header"
import Footer from "../shared/Footer"

export default function LayoutPrivate() {
	const { logged } = useUserContext()
	const navigate = useNavigate()

	useEffect(() => {
		if (!logged) {
			const loggedInUser = localStorage.getItem("loggedUser")
			if (!loggedInUser) {
				navigate("/login")
			}
		}
	}, [logged, navigate])

	return (
		<div>
			<Header />
			<Outlet />
			<Footer />
		</div>
	)
}
