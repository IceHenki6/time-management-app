import { createContext, useReducer } from "react";

const notificationReducer = (state, action) => {
  switch(action.type) {
    case "SAVE_TASK":
      return 'Task succesfully saved'
    case "DELETE":
      return 'Task deleted'
    case "ERROR":
      return `${action.message}`
    case "CLEAR":
      return null
    default:
      return state
  }
}

const notificationContext = createContext()
export const NotificationContextProvider = ({ children }) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, null)

  return(
    <notificationContext.Provider value = { [notification, notificationDispatch] }>
      {children}
    </notificationContext.Provider>
  )
}

export default notificationContext