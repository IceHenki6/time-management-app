import { createContext, useState } from "react";
import taskService from "../services/taskService";
import { useEffect } from "react";

export const TaskContext = createContext()

export const TaskContextProvider = ({children}) => {
  const [currentTask, setCurrentTask] = useState(null)
  const [sessionData, setSessionData] = useState(null)

  const setTask = (task) => {
    setCurrentTask(task)
  }

  const getTask = () => {
    return currentTask
  }

  const setSession = (data) => {
    setSessionData(data)
  }

  const getSessionData = () =>{
    return sessionData
  }

  useEffect(() => {
    setCurrentTask(currentTask)
    console.log('bla')
  }, [currentTask])

  useEffect(() => {
    setSessionData(sessionData)
  }, [sessionData])

  return (
    <TaskContext.Provider value={{setTask, getTask, setSession, getSessionData}}>
      {children}
    </TaskContext.Provider>
  )
}