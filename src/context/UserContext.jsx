import React, { createContext, useContext, useState } from "react"

export const UserContext = createContext()

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loged, setLoged] = useState(false)
  const [favs, setFavs] = useState([])

  // Cargar animes favoritos del localStorage al iniciar sesión
  const loadFavsLS = () => {
    const storedFavs = localStorage.getItem(`${user}-favs`)
    if (storedFavs) {
      setFavs(JSON.parse(storedFavs));
    }
  }

  // Actualizar favoritos y añadir en localStorage
  const updateFavs = (newFav) => {
    const updatedFavs = [...favs]
    const existingFavIndex = updatedFavs.findIndex((fav) => fav.id === newFav.id)

    if (existingFavIndex !== -1) {
      updatedFavs[existingFavIndex] = newFav
    } else {
      updatedFavs.push(newFav)
    }

    setFavs(updatedFavs)
    localStorage.setItem(`${user}-favs`, JSON.stringify(updatedFavs))
  }

  return (
    <UserContext.Provider value={{ user, setUser, favs, setFavs, loged, setLoged, updateFavs, loadFavsFromLocalStorage: loadFavsLS }} >
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider

export const useUserContext = () => useContext(UserContext)