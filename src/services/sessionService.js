// import axios from "axios";
import useAxiosPrivate from "../hooks/useAxiosPrivate"
const baseUrl = '/sessions'


// const create = async (newObj) => {
//   // const token = `Bearer ${user.token}`
//   // const config = {
//   //   headers: { Authorization: token }
//   // }
//   // const axiosPrivate = useAxiosPrivate()
  
//   // const response = await axiosPrivate.post(baseUrl,newObj)
//   // return response.data
// }

export const saveSession = async (sessionObj, axiosPrivate) => {
  try {
    await axiosPrivate.post('/api/sessions', sessionObj)
  } catch (error) {
    console.error(error)
  }
}

export const saveSessionAndTask = async (sessionObj, taskObj, axiosPrivate) => {
  try {
    await axiosPrivate.post('/api/sessions', sessionObj)
    await axiosPrivate.put(`/api/tasks/${sessionObj.taskId}`, taskObj)
    console.log("session created")
  } catch (error) {
    console.error(error)
  }
}
// export default {saveSessionAndTask, saveSession }