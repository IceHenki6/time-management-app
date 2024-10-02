import { useEffect, useState } from "react"
import Sidebar from "../../components/Sidebar/Sidebar"
import './account.css'
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import MobileNavbar from "../../components/MobileNavbar/MobileNavbar"


const Account = () => {
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [focus, setFocus] = useState(false)

  const axiosPrivate = useAxiosPrivate()

  const baseUrl = '/api/users'


  useEffect(() => {
    let unsubscribed = false

    const getUser = async () => {
      try {
        const response = await axiosPrivate.get(baseUrl)
        if(!unsubscribed){
          setUser(response.data)
          setUsername(response.data.username)
        }
      } catch (error) {
        console.error(error)
      }
    }

    getUser()

    return () => unsubscribed = true
  }, [])

  const updateUsername = async (event) => {
    event.preventDefault()
    const newObj = {
      "username": username
    }
    try {
      await axiosPrivate.patch(`${baseUrl}/updateUsername`,newObj)
    } catch (error) {
      console.error(error)
    }
  }

  const changePassword = async (event) => {
    event.preventDefault()
    const newObj = {
      "password": newPassword
    }

    try{
      await axiosPrivate(`${baseUrl}/updatePassword`, newObj)
    }catch(error){
      console.error(error)
    }
  }


  const handleUsernameChange = ({ target }) => {
    setUsername(target.value)
  }

  const handleFocus = () => {
    setFocus(true)
  }

  return (
    <div className="page-container account-container">
      <Sidebar />
      <MobileNavbar />
      {username && <div className="account">
        <div className="account-title__container">
          <h1 className="account-title">Account</h1>
        </div>

        <div className="account-items">
          <div className="email-container">
            <h3>email</h3>
            <p>{user.email}</p>
          </div>

          <div className="username-form__container">
            <h3>username</h3>
            <form onSubmit={updateUsername}>
              <input
                type="text"
                name="username"
                value={username}
                className="account-input"
                onChange={handleUsernameChange}
              />
              <button id="update-username__button">Change Username</button>
            </form>
          </div>

          <div className="password-form__container">
            <h3>password</h3>
            <form onSubmit={changePassword}>
              <label htmlFor="password">password
                <input
                  type="password"
                  name="password"
                  id="account-settings__password"
                  // onFocus={() => setFocus(true)}
                  focused = {focus.toString()}
                  onBlur={handleFocus}
                  onChange={({target}) => setNewPassword(target.value)}
                  className="account-input"
                  pattern= "^(?=.*[A-Z])(?=.*[a-zA-Z0-9]).{8,20}$"
                  required
                />
                <span className="account-input__error">Incorrect password format</span>
              </label>

              <label htmlFor="confirm-password">confirm password
                <input
                  type="password"
                  id="account-settings__paswordconfirm"
                  onFocus={() => setFocus(true)}
                  focused = {focus.toString()}
                  onChange={({target}) => setConfirmPassword(target.value)}
                  name="confirm-password"
                  className="account-input"
                  onBlur={handleFocus}
                  pattern={newPassword}
                  required
                />
                <span className="account-input__error">Passwords don't match</span>
              </label>

              <button id="update-password__button">Change Password</button>
            </form>
            
            
          </div>
        </div>

      </div>}
    </div>
  )
}

export default Account