import { useState } from "react"
import './mobileNavbar.css'
import { NavLink, useNavigate } from "react-router-dom"
import Logo from "../Logo/Logo"

const MobileNavbar = () => {
  const [visible, setVisible] = useState(false)
  const navigate = useNavigate()

  const show = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div className="mobile-navbar">
      <Logo />

      <button className="hamburger-btn" onClick={toggleVisibility}><span className="material-symbols-outlined">menu</span></button>
      <div className="menu" style={show}>
        <nav className="mobile-nav">
          <div></div>
          <div className="mobile-navigation">
            <NavLink className={
              ({ isActive, isPending }) => isPending ? "mobile-nav-item__pending" : isActive ? "mobile-nav-item__active" : "mobile-nav-item"
            } to='/todo'>
              <span className="material-symbols-outlined mobile-navbar-icon" >
                select_check_box
              </span>
              <h3 className="mobile-nav__text">Todo List</h3>
            </NavLink>

            <NavLink className={
              ({ isActive, isPending }) => isPending ? "mobile-nav-item__pending" : isActive ? "mobile-nav-item__active" : "mobile-nav-item"
            } to='/timer'>
              <span className="material-symbols-outlined mobile-navbar-icon" >
                schedule
              </span>
              <h3 className="mobile-nav__text">Timer</h3>
            </NavLink>

            <NavLink className={
              ({ isActive, isPending }) => isPending ? "mobile-nav-item__pending" : isActive ? "mobile-nav-item__active" : "mobile-nav-item"
            } to='/tasks'>
              <span className="material-symbols-outlined mobile-navbar-icon">
                list
              </span>
              <h3 className="mobile-nav__text">Task List</h3>
            </NavLink>

            <NavLink className={
              ({ isActive, isPending }) => isPending ? "mobile-nav-item__pending" : isActive ? "mobile-nav-item__active" : "mobile-nav-item"
            } to='/stats'>
              <span className="material-symbols-outlined mobile-navbar-icon">
                monitoring
              </span>
              <h3 className="mobile-nav__text">Stats</h3>
            </NavLink>

            <NavLink className={
              ({ isActive, isPending }) => isPending ? "mobile-nav-item__pending" : isActive ? "mobile-nav-item__active" : "mobile-nav-item"
            } to='/account'>
              <span className="material-symbols-outlined mobile-navbar-icon">
                account_circle
              </span>
              <h3 className="mobile-nav__text">Account</h3>
            </NavLink>
          </div>
          {/* <div className="logout-container">
            <div>
              <span className="material-symbols-outlined">
                logout
              </span>
              <button className="logout-btn" onClick={handleLogout}>Log out</button>
            </div>
          </div> */}
        </nav>
        <button className="close-btn" onClick={toggleVisibility}><span className="material-symbols-outlined">close</span></button>
      </div>
    </div>
  )
}

export default MobileNavbar