import React, { createContext, useContext, useState } from "react"

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null, {favorites: []})
  const [loged, setLoged] = useState(false)

  // Agrega una propiedad de favoritos al objeto de usuario
  const updateUserFavorites = (favorites) => {
    setUser({ ...user, favorites })
  }

  return (
    <UserContext.Provider value={{ user, setUser, loged, setLoged, updateUserFavorites }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider

export const useUserContext = () => useContext(UserContext)