import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router'
import { useUserContext } from '../context/UserContext'

export default function LayoutPrivate() {

    const { user } = useUserContext()
    const navigate = useNavigate()

    useEffect(() => {
        if (!user) {
            navigate("/login")
        }
    }, [user])

    return (
        <div>
            <div>LayoutPrivate</div>
            <Outlet></Outlet>
        </div>
    )
}