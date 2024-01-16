import React, { useEffect, useState } from "react"
import defaultpfp from "../images/defaultpfp.png"

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
    <div>
      <h1>Profile</h1>
      <img className="defaultPfp" src={defaultpfp} alt="Profile" />
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <p>Birthday: {user.birthday}</p>
    </div>
  )
}

export default UserProfile