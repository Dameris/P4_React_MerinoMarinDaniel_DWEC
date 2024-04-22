import React, { useState } from "react"
import { Outlet } from "react-router"
import Header from "../shared/Header"
import Footer from "../shared/Footer"

export default function LayoutPublic() {
    return (
        <div>
            <Header></Header>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    )
}