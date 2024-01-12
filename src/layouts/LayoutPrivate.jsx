import React, { useEffect } from "react"
import { Outlet, useNavigate } from "react-router"
import { useUserContext } from "../context/UserContext"
import Header from "../pages/Header"
import Footer from "../pages/Footer"

export default function LayoutPrivate() {

    const { loged } = useUserContext()
    const navigate = useNavigate()

    useEffect(() => {
        if (!loged) {
            navigate("/login")
        }
    }, [loged])

    return (
        <div>
            <Header></Header>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    )
}