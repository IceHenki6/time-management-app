import { Link, NavLink, useNavigate } from 'react-router-dom'
import Logo from '../Logo/Logo'
import './navbar.css'
import useLogout from '../../hooks/useLogout'

const Navbar = ({ auth }) => {
  const logout = useLogout()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }
  return (
    <div className='navbar container'>
      <div className='navbar-logo'>
        <Logo />
      </div>

      <nav className='navbar-items__container'>
        {auth?.token ?
          <div>
            <NavLink className='home-nav-item' to="/account">
              <span className="material-symbols-outlined">
                account_circle
              </span>
              <p>{auth.username}</p>
            </NavLink>


            <button className='logout-navbar__btn' onClick={handleLogout}>
              <span className="material-symbols-outlined">
                logout
              </span>
              logout
            </button>
          </div>
          :
          <div>
            <Link className="home-nav__login" to="/login">
              Log In
            </Link>
            <Link className="home-nav__register" to="/register">
              Register
            </Link>
          </div>
        }
      </nav>
    </div>
  )
}

export default Navbar