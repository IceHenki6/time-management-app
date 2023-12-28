import { useContext } from "react"
import { AuthContext } from "../context/authContext";
import axios from "../api/axios";

const useRefreshToken = () => {
  const { setAuth } = useContext(AuthContext)
  const refresh = async () => {
    const response = await axios.get('/api/refresh-token', {
      withCredentials: true
    })
    setAuth(prev => {
      return {...prev, token: response.data.token, username: response.data.username}
    })
    return response.data.token
  }
  return refresh
}

export default useRefreshToken