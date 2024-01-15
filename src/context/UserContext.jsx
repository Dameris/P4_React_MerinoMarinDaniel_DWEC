import React, { createContext, useContext, useState } from "react"

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ username, email, birthday, favorites: [] })
  const [logged, setLogged] = useState(false)

  // Agrega una propiedad de favoritos al objeto de usuario
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