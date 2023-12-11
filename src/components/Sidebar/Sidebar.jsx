import { NavLink, useNavigate } from "react-router-dom"
import navbarImg from '../../images/navbar-img.svg'
import './sidebar.css'
import useLogout from "../../hooks/useLogout"

const Sidebar = () => {
  const logout = useLogout()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }
  return (
    <div className="sidebar-container">
      <div className="navbar-img__container">
        <img src={navbarImg} id="navbar-img" alt="" />
      </div>
      <nav className="sidebar">
        <div></div>
        <div className="sidebar-navigation">
          <NavLink className={
            ({ isActive, isPending }) => isPending ? "nav-item__pending" : isActive ? "nav-item__active" : "nav-item"
          } to='/todo'>
            <span className="material-symbols-outlined navbar-icon" >
              select_check_box
            </span>
            <h3>Todo List</h3>
          </NavLink>

          <NavLink className={
            ({ isActive, isPending }) => isPending ? "nav-item__pending" : isActive ? "nav-item__active" : "nav-item"
          } to='/timer'>
            <span className="material-symbols-outlined navbar-icon" >
              schedule
            </span>
            <h3>Timer</h3>
          </NavLink>

          <NavLink className={
            ({ isActive, isPending }) => isPending ? "nav-item__pending" : isActive ? "nav-item__active" : "nav-item"
          } to='/tasks'>
            <span className="material-symbols-outlined navbar-icon">
              list
            </span>
            <h3>Task List</h3>
          </NavLink>

          <NavLink className={
            ({ isActive, isPending }) => isPending ? "nav-item__pending" : isActive ? "nav-item__active" : "nav-item"
          } to='/stats'>
            <span className="material-symbols-outlined navbar-icon">
              monitoring
            </span>
            <h3>Stats</h3>
          </NavLink>

          <NavLink className={
            ({ isActive, isPending }) => isPending ? "nav-item__pending" : isActive ? "nav-item__active" : "nav-item"
          } to='/account'>
            <span className="material-symbols-outlined navbar-icon">
              account_circle
            </span>
            <h3>Account</h3>
          </NavLink>
        </div>
        <div className="logout-container">
          <div>
            <span className="material-symbols-outlined">
              logout
            </span>
            <button className="logout-btn" onClick={handleLogout}>Log out</button>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Sidebar