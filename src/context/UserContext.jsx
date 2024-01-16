import React, { createContext, useContext, useState } from "react"

const UserContext = createContext()

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    birthday: "",
    favorites: []
  })
  const [logged, setLogged] = useState(false)

  // Función para actualizar los favoritos del usuario
  const updateUserFavorites = (newFavorites) => {
    setUser((prevUser) => ({
      ...prevUser,
      favorites: newFavorites,
    }))
  }

  return (
    <UserContext.Provider value={{ user, setUser, logged, setLogged, updateUserFavorites }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider

export const useUserContext = () => useContext(UserContext)