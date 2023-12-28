import { NavLink } from 'react-router-dom'
import Logo from '../Logo/Logo'
import './navbar.css'

const Navbar = ({auth}) => {

  return (
    <div className='navbar container'>
      <div className='navbar-logo'>
        <Logo />
      </div>

      <nav className='navbar-items__container'>
        {auth?.token ?
          <div>
            <p>{auth.username}</p>
            <button>logout</button>
          </div>
          :
          <div>
            <NavLink className="home-nav__login" to="/login">
              Log In
            </NavLink>
            <NavLink className="home-nav__register" to="/register">
              Register
            </NavLink>
          </div>
        }
      </nav>
    </div>
  )
}

export default Navbar