// import axios from "axios";
import useAxiosPrivate from "../hooks/useAxiosPrivate"
const baseUrl = '/sessions'


const create = async (newObj) => {
  // const token = `Bearer ${user.token}`
  // const config = {
  //   headers: { Authorization: token }
  // }
  // const axiosPrivate = useAxiosPrivate()
  
  // const response = await axiosPrivate.post(baseUrl,newObj)
  // return response.data
}

export default {create}