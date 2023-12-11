import axios from "axios";

const baseUrl = '/users'

const getUser = async () => {
  // const token = `Bearer ${user.token}`
  // const config = {
  //   headers: { Authorization: token }
  // }

  const response = await axios.get(baseUrl)

  return response.data
}

const updateUsername = async (newObj) => {
  // const token = `Bearer ${user.token}`
  // const config = {
  //   headers: { Authorization: token }
  // }

  const response = await axios.patch(`${baseUrl}/updateUsername`, newObj)
  return response.data
}

const updatePassword = async (newObj) => {
  // const token = `Bearer ${user.token}`

  // const config = {
  //   headers: { Authorization: token }
  // }

  const response = await axios.patch(`${baseUrl}/updatePassword`, newObj)

  return response.data
}

const getUserSessions = async() => {
  // const token = `Bearer ${user.token}`
  // const config = {
  //   headers: { Authorization: token }
  // }

  const response = await axios.get(`${baseUrl}/sessions`)
  return response.data
}
export default { getUser, updateUsername, getUserSessions, updatePassword }