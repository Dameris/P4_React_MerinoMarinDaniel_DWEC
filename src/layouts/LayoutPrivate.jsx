import React, { useEffect } from "react"
import { Outlet, useNavigate } from "react-router"
import { useUserContext } from "../context/UserContext"
import Header from "../shared/Header"
import Footer from "../shared/Footer"

export default function LayoutPrivate() {

    const { logged } = useUserContext()
    const navigate = useNavigate()

    useEffect(() => {
        if (!logged) {
            navigate("/login")
        }
    }, [logged])

    return (
        <div>
            <Header></Header>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    )
}