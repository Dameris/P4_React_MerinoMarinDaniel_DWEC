import React, { useState } from 'react'
import { Outlet } from 'react-router'
import Header from '../pages/Header'
import Footer from '../pages/Footer'

export default function LayoutPublic() {
    return (
        <div>
            <Header></Header>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    )
}
