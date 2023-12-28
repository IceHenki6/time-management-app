import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/authContext"
import './HomePage.css'
import homePageIllustration1 from "../../images/hp1.svg"
import homePageIllustration2 from "../../images/hp2.svg"
import screenshot1 from "../../images/screentodo.png"
import screenshot2 from "../../images/screentimeselector.png"
import screenshot3 from "../../images/screenstats.png"
import heroImg from "../../images/hero-img.svg"
import Navbar from "../../components/Navbar/Navbar"
import Footer from "../../components/Footer"

const AppDescription = ({ title, description, img }) => {

  return (
    <div className="app-description container">
      <div className="title-and-desc">
        <h2 className="app-description__title">{title}</h2>
        <p className="app-description__description">{description}</p>
      </div>
      <div className="app-description__img">
        <img src={img} alt="" />
      </div>
    </div>
  )
}

const HomePage = () => {
  const navigate = useNavigate()
  const { auth } = useContext(AuthContext)

  return (
    <div className="home-page__container">
      <Navbar auth={auth}/>
      <div className="home-page__hero container">
        <div className="hero">
          <h1 className="hero-title"><span>Timefrost.</span> Seamlessly Manage Tasks, Stay Focused, and Achieve More in Less Time.</h1>
          <h3 className="hero-description">Let Every Second Count Towards Your Success!</h3>
          {!auth.token &&
            <div className="not-logged__hero">
              <h2><Link className="home-login__btn" to={"/login"}>Start now!</Link></h2>
            </div>
          }
          {auth.token && <div className="logged-hero">
            <button onClick={() => {
              navigate('/todo')
            }}>Start</button>
          </div>}
        </div>

        <div className="hero-img">
          <img src={heroImg} alt="" />
        </div>
      </div>

      <div className="description-container">
        <AppDescription
          title={"Organize your tasks"}
          description={"Effortlessly organize tasks, set priorities, and track progress. Create, manage, and conquer your to-do list with ease. Stay focused, achieve more!"}
          img={screenshot1}
        />

        <AppDescription
          title={"Time your productivity"}
          description={"Set your countdown timer, dive into focused study sessions, and conquer your goals. Stay disciplined, track progress, and own your study routine like never before!"}
          img={screenshot2}
        />

        <AppDescription
          title={"See your statistics"}
          description={"Track Your Study Journey: Dive into insightful statistics that reveal your study habits. Monitor time spent, track progress, and adapt your approach for maximum efficiency."}
          img={screenshot3}
        />
        
      </div>
      <Footer />
    </div>
  )
}

export default HomePage