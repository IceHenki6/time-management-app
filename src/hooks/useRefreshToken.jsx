import { useContext } from "react"
import { AuthContext } from "../context/authContext";
import axios from "../api/axios";

const useRefreshToken = () => {
  const { setAuth } = useContext(AuthContext)
  // console.log('refresh runs')
  const refresh = async () => {
    const response = await axios.get('/api/refresh-token', {
      withCredentials: true
    })
    setAuth(prev => {
      console.log(JSON.stringify(prev))
      console.log(response.data.token)
      return {...prev, token: response.data.token}
    })
    return response.data.token
  }
  return refresh
}

export default useRefreshToken