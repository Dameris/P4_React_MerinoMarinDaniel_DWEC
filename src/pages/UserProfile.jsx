import React, { useEffect, useState } from "react"
import pfp from "../images/pfp.jpg"

const UserProfile = () => {
  const [user, setUser] = useState({
    email: "",
    username: "",
    birthday: ""
  })

  useEffect(() => {
    const username = localStorage.getItem("loggedUser")

    const storedUsers = JSON.parse(localStorage.getItem("users")) || []
    const currentUser = storedUsers.find((existingUser) => existingUser.username === username)

    if (currentUser) {
      setUser(currentUser)
    }
  }, [])

  return (
    <div className="userProfile">
      <div className="pfInfo">
        <img className="defaultPfp" src={pfp} alt="Profile" />
        <div className="userInfoBox">
          <p>Username: {user.username} <br /></p>
          <p>Email: {user.email} <br /></p>
          <p>Birthday: {user.birthday}</p>
        </div>
      </div>
    </div>
  )
}

export default UserProfile