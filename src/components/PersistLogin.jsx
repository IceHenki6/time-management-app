import { useContext, useEffect, useState } from "react"
import useRefreshToken from "../hooks/useRefreshToken"
import { AuthContext } from "../context/authContext"
import { Outlet } from "react-router-dom"


const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true)

  const refresh = useRefreshToken()
  const { auth } = useContext(AuthContext)

  useEffect(() => {
    let isMounted = true

    const verifyRefreshToken = async () => {
      try {
        await refresh()
      } catch (error) {
        console.error(error)
      } finally {
        isMounted && setIsLoading(false)
      }
    }


    !auth?.token ? verifyRefreshToken() : setIsLoading(false)

    return () => isMounted = false
  }, [])


  return (
    <>
      {isLoading ? <p>Loading...</p> : <Outlet />}
    </>
  )
}

export default PersistLogin



