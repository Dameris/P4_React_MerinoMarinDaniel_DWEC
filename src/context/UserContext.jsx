import React, { createContext, useContext, useState } from "react"

export const UserContext = createContext()

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loged, setLoged] = useState(false)

  return (
    <UserContext.Provider value={{ user, setUser, loged, setLoged }} >
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider

export const useUserContext = () => useContext(UserContext)