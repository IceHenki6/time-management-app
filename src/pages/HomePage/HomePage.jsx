import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/authContext"
import './HomePage.css'
import homePageIllustration1 from "../../images/hp1.svg"
import homePageIllustration2 from "../../images/hp2.svg"

const HomePage = () => {
  const navigate = useNavigate()
  const { currentUser } = useContext(AuthContext)

  return (
    <div className="home-page__container">
      <img src={homePageIllustration1} id="homepage-img_1" alt="" />
      <img src={homePageIllustration2} id="homepage-img_2" alt="" />

      <div className="home-page__hero">
        <h1 className="hero-title">Time your productivity in one place.</h1>
        <h3 className="hero-description">Alphatime is a productivity web app where you can time your study/work sessions and save your tasks.</h3>
        {!currentUser &&
          <div className="not-logged__hero">
            <h2><Link className="home-login__btn" to={"/login"}>Start now!</Link></h2>
          </div>
        }
        {currentUser && <div className="logged-hero">
          <button onClick={() => {
            navigate('/todo')
          }}>Start</button>
        </div>}

        <span className="material-symbols-outlined" id="expand-arrow">
          expand_more
        </span>
      </div>
    </div>
  )
}

export default HomePage