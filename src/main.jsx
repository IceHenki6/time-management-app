import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthContextProvider } from './context/authContext.jsx'
import { TaskContextProvider } from './context/taskContext.jsx'
import { NotificationContextProvider } from './context/notificationContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <TaskContextProvider>
          <NotificationContextProvider>
            <Routes>
              <Route path='/*' element={<App />} />
            </Routes>
          </NotificationContextProvider>
        </TaskContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
