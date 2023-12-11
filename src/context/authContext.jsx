import { createContext, useState } from "react"
import axios from "../api/axios"

export const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {
  const [auth, setAuth] = useState({})

  const login = async (credentials) => {
    const response = await axios.post(
        '/api/login', 
        credentials,
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        } 
      )
    setAuth(response.data)
  }

  return(
    <AuthContext.Provider value={{auth, login, setAuth}}>{children}</AuthContext.Provider>
  )
}