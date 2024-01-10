import { Children, createContext, useContext, useState } from "react";


export const UserContext = createContext()

const UserProvider = ({children}) => {


  const [user, setUser] = useState(false)
  
  const [loged, setLoged] = useState(false)

  const [favs, setFavs] = useState(null)

  return (
    <UserContext.Provider value={{user, setUser, favs, setFavs, loged, setLoged}}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider

export const useUserContext = () => useContext(UserContext)