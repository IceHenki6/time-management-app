import { useContext, useState } from "react"
import { AuthContext } from "../../context/authContext"
import { Link, useNavigate } from "react-router-dom"
import notificationContext from "../../context/notificationContext"
import Notification from "../../components/Notification"
import loginWaves from "../../images/loginwaves.svg"
import './Login.css'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useContext(AuthContext)

  const [notification, dispatch] = useContext(notificationContext)

  const navigate = useNavigate()

  const handleEmailChange = ({ target }) => {
    setEmail(target.value)
  }

  const handlePasswordChange = ({ target }) => {
    setPassword(target.value)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      await login({
        email,
        password
      })

      navigate('/timer')
    } catch (error) {
      console.log(error)
      dispatch({
        type: 'ERROR',
        message: 'Invalid username or password'
      })
      setPassword('')
      setEmail('')
      setTimeout(() => {
        dispatch({ type: 'CLEAR' })
      }, 4000)
    }
  }

  return (
    <div className="login-container">
      <div className="login">
        <h1 id="login-title">Log in</h1>
        <form onSubmit={handleLogin} className="login-form">
          <div className="login-input__container">
            <label className="login-form__label" htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              value={email}
              id="email-login"
              onChange={handleEmailChange}
              minLength={1}
              maxLength={50}
            />
          </div>

          <div className="login-input__container">
            <label className="login-form__label" htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              value={password}
              id="password-login"
              onChange={handlePasswordChange}
              minLength={1}
              maxLength={20}
            />
          </div>
          <button className="login-btn" type="submit">Log in</button>
          <p>are you new here? <Link to="/register">Create a new account</Link></p>
          <Notification />
        </form>
      </div>
    </div>
  )
}

export default Login