import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

const Protected = () => {
  const { auth } = useContext(AuthContext)
  const location = useLocation()
  return (
    auth?.token 
      ? <Outlet /> 
      : <Navigate to='/login' state={{ from: location }} replace />
  )
}

export default Protected