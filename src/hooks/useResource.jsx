import { useState, useEffect } from "react";
import useAxiosPrivate from "./useAxiosPrivate";

const useProtectedResource = (baseUrl) => {
  const axiosPrivate = useAxiosPrivate()
  const [resources, setResources] = useState([])

  useEffect(() => {
    let unsubscribed = false

    const getAll = async () => {
      try {
        const response = await axiosPrivate.get(baseUrl)
        !unsubscribed && setResources(response.data)
      } catch (error) {
        console.error(error)
      }
    }

    getAll()

    return () => {
      unsubscribed = true
    }
  }, [])


  const getAll = async () => {
    try {
      const response = await axiosPrivate.get(baseUrl)
      setResources(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  const create = async (resource) => {
    try {
      const response = await axiosPrivate.post(baseUrl, resource)
      getAll()
    } catch (error) {
      console.error(error)
    }
  }

  const update = async (resource, id) => {
    try {
      const response = await axiosPrivate.put(`${baseUrl}/${id}`, resource)
      getAll()
    } catch (error) {
      console.error(error)
    }
  }

  const remove = async (id) => {
    try{
      await axiosPrivate.delete(`${baseUrl}/${id}`)
      getAll()
    }catch(error){
      console.error(error)
    }
  }

  const service = {
    create,
    update,
    remove
  }

  return [resources, service]
}

export default useProtectedResource