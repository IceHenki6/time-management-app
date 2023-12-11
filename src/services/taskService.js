import axios from "axios";
// import axios from "../api/axios";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
// const baseUrl = '/api/tasks'
import useAxiosPrivate from "../hooks/useAxiosPrivate";
const baseUrl = '/tasks'

// const {currentUser} = useContext(AuthContext) 
// const token = `Bearer ${currentUser.token}`

//if shit breaks, look at the repo
const getAll = async () => {
  // const token = `Bearer ${user.token}`
  // const config = {
  //   headers: { Authorization: token }
  // }
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (newObj) => {
  // const token = `Bearer ${user.token}`
  // const config = {
  //   headers: { Authorization: token }
  // }
  const response = await axios.post(baseUrl, newObj)
  return response.data
}

const update = async(newObj, id) => {
  // const token = `Bearer ${user.token}`
  // const config = {
  //   headers: { Authorization: token }
  // }
  const response = await axios.put(`${baseUrl}/${id}`, newObj)
  return response.data
}

const remove = async(id) => {
  // const token = `Bearer ${user.token}`
  // const config = {
  //   headers: { Authorization: token }
  // }
  const response = await axios.delete(`${baseUrl}/${id}`)
  return response.data
}

const getTotalTime = async(id) => {
  // const token = `Bearer ${user.token}`
  // const config = {
  //   headers: { Authorization: token }
  // }
  const response = await axios.delete(`${baseUrl}/${id}/totalTime`)
  return response.data
}


export default { getAll, create, update, remove, getTotalTime }