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
      console.log('verify refresh token running')
      try {
        await refresh()
      } catch (error) {
        console.error(error)
      } finally {
        console.log(`is mounted: ${isMounted}`)
        isMounted && setIsLoading(false)
      }
    }

    console.log(`shit token: ${auth?.token}`)

    !auth?.token ? verifyRefreshToken() : setIsLoading(false)

    return () => isMounted = false
  }, [])

  useEffect(() => {
    console.log(`isLoading: ${isLoading}`)
    console.log(`aT: ${JSON.stringify(auth?.token)}`)
  }, [isLoading])

  return (
    <>
      {isLoading ? <p>Loading...</p> : <Outlet />}
    </>
  )
}

export default PersistLogin



