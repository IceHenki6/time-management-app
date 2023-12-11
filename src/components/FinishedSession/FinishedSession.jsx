
import './finishedSession.css'
import confettiImg from '../../images/party-popper.svg'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { TaskContext } from '../../context/taskContext'


const FinishedSession = ({timeFocused}) => {
  const navigate = useNavigate()
  const { setTask } = useContext(TaskContext)

  const handleGoBack = () => {
    setTask(null)
    navigate('/todo')
  }

  return(
    <div className="finished-session__container">
      <div className="finished-session">
        <img src={confettiImg} alt="" />
        <h1 className="congrats-msg">
          Congratulations, you finished your sessions!!!
        </h1>

        <div className="session-details">
          <p>You were focused for {timeFocused} minutes</p>
        </div>

        <button onClick={handleGoBack}>OK</button>
      </div>
    </div>
  )
}

export default FinishedSession