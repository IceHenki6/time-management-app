import { createContext, useEffect, useState } from "react"
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
    console.log(response.data)
  }

  // const logout = () => {
  //   setCurrentUser(null)
  // }

  // const refreshUser = (newUser) => {
  //   setCurrentUser(newUser)
  // }

  // useEffect(() => {
  //   localStorage.setItem('user', JSON.stringify(currentUser))
  // }, [currentUser])

  return(
    <AuthContext.Provider value={{auth, login, setAuth}}>{children}</AuthContext.Provider>
  )
}