import { useState } from "react"
import axios from "../../api/axios"
import './SignIn.css'
import { useNavigate } from "react-router-dom"

const SignInput = (props) => {
  const { handleChange, error, label, ...inputProps } = props
  const [focus, setFocus] = useState(false)

  const handleFocus = () => {
    setFocus(true)
  }

  return(
    <div className="login-input__container">
      <label className="login-form__label">{label}</label>
      <input
        {...inputProps}
        onChange = {handleChange}
        onFocus = {() => inputProps.name === "passwordConfirm" && setFocus(true)}
        focused = {focus.toString()}
        onBlur = {handleFocus}
        className="signin-input"  
      />
      <span className="input-error__msg">{error}</span>
    </div>
  )
}

const SignUp = () => {
  const [values, setValues] = useState({
    email: "",
    username: "",
    password: "",
    passwordConfirm: ""
  })

  const inputs = [
    {
      id: 1,
      name: "email",
      type: "email",
      placeholder: "youremail@example.com",
      label: "E-mail",
      required: true,
      error: "You must enter a valid E-mail address."
    },
    {
      id: 2,
      name: "username",
      type: "text",
      placeholder: "username",
      label: "Username",
      pattern: "^[A-Za-z0-9]{2,15}$",
      error: "The username must contain only letters and numbers, it must not include special characters.",
      required: true
    },
    {
      id: 3,
      name: "password",
      type: "password",
      placeholder: "password",
      label: "Password",
      pattern: "^(?=.*[A-Z])(?=.*[a-zA-Z0-9]).{8,20}$",
      error: "The password must be 8-20 characters, and should contain letters and numbers and at least one uppercase letter",
      required: true
    },
    {
      id: 4,
      name:"passwordConfirm",
      type:"password",
      placeholder: "confirm your password",
      label: "Confirm your password",
      pattern: values.password,
      error: "The passwords don't match.",
      required: true
    }
  ]

  const handleChange = ({target}) => {
    setValues({...values, [target.name]: target.value})
  }

  const navigate = useNavigate()

  const handleSignIn = async (event) => {
    event.preventDefault()
    const credentials = {
      "email" : values['email'],
      "username" : values['username'],
      "password" : values['password']
    }
    console.log("signin in...")
    try {
      await axios.post(
        '/api/register', 
        credentials,
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        } 
      )
      navigate('/login')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="login-container">
      <div className="login">
        <h1 id="login-title">Sign in</h1>
        <form onSubmit={handleSignIn} className="login-form">
          {inputs.map((input) => (
            <SignInput 
              key = {input.id}
              {...input}
              value = {values[input.name]}
              handleChange = {handleChange}
            />
          ))}

          <button className="login-btn" type="submit">Sign in</button>
        </form>
      </div>
    </div>
  )
}

export default SignUp