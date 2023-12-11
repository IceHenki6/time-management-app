import { useContext, useEffect, useState } from "react"
import { TaskContext } from "../../context/taskContext"
import { useNavigate } from "react-router-dom"
import taskService from "../../services/taskService"
import { AuthContext } from "../../context/authContext"

import './timeSelector.css'

const TimeSelector = ({ selectTime }) => {
  const [sessionTime, setSessionTime] = useState(25)
  const [breakTime, setBreakTime] = useState(10)
  const [numberOfSessions, setNumberOfSessions] = useState(1)
  const [numberOfHours, setNumberOfHours] = useState(parseInt(localStorage.getItem('dailyGoal')) || 1)


  const navigate = useNavigate()

  useEffect(() => {
    localStorage.setItem('dailyGoal', numberOfHours)
  }, [numberOfHours])

  const handleIncrease = (name) => {
    switch (name) {
      case 'sessionTime':
        if (sessionTime < 120) {
          setSessionTime(prevSessionTime => prevSessionTime + 5)
        }
        break;
      case 'breakTime':
        if (breakTime < 60) {
          setBreakTime(prevBreakTime => prevBreakTime + 5)
        }
        break;
      case 'numberOfSessions':
        if (numberOfSessions < 20) {
          setNumberOfSessions(prevNumberOfSessions => prevNumberOfSessions + 1)
        }
        break;
      case 'dailyGoal':
        if (numberOfHours < 12) {
          setNumberOfHours(prevNumberOfHours => prevNumberOfHours + 1)
        }
        break;
      default:
        break;
    }
  }

  const handleDecrease = (name) => {
    switch (name) {
      case 'sessionTime':
        if (sessionTime > 10) {
          setSessionTime(prevSessionTime => prevSessionTime - 5)
        }
        break;
      case 'breakTime':
        if (breakTime > 5) {
          setBreakTime(prevBreakTime => prevBreakTime - 5)
        }
        break;
      case 'numberOfSessions':
        if (numberOfSessions > 1) {
          setNumberOfSessions(prevNumberOfSessions => prevNumberOfSessions - 1)
        }
        break;
      case 'dailyGoal':
        if (numberOfHours > 1) {
          setNumberOfHours(prevNumberOfHours => prevNumberOfHours - 1)
        }
        break;
      default:
        break;
    }
  }

  const addSessionData =  () => {
    const sessionData = {
      sessionTime: sessionTime,
      breakTime: breakTime,
      numberOfSessions: numberOfSessions
    }
    selectTime(sessionData)
  }

  const handleCancel = () => {
    navigate('/todo')
  }

  return (
    <div className="time-selectors__container">
      <div className="time-selectors">
        <div className="selector-container">
          <h1>Session Duration</h1>
          <div className="selector">
            <button className="control" onClick={() => handleIncrease('sessionTime')}>
              <span className="material-symbols-outlined">
                keyboard_arrow_up
              </span>
            </button>
            <div className="number-input" id="session-time">{sessionTime}</div>
            <button className="control" onClick={() => handleDecrease('sessionTime')}>
              <span className="material-symbols-outlined">
                keyboard_arrow_down
              </span>
            </button>
          </div>
        </div>
        <div className="selector-container">
          <h1>Break Duration</h1>
          <div className="selector">
            <button className="control" onClick={() => handleIncrease('breakTime')}>
              <span className="material-symbols-outlined">
                keyboard_arrow_up
              </span>
            </button>
            <div className="number-input" id="break-time">{breakTime}</div>
            <button className="control" onClick={() => handleDecrease('breakTime')}>
              <span className="material-symbols-outlined">
                keyboard_arrow_down
              </span>
            </button>
          </div>
        </div>
        <div className="selector-container">
          <h1>Number of Sessions</h1>
          <div className="session-number__selector">
            <button className="control" onClick={() => handleIncrease('numberOfSessions')}>
              <span className="material-symbols-outlined">
                keyboard_arrow_up
              </span>
            </button>
            <div className="number-input" id="session-number">{numberOfSessions}</div>
            <button className="control" onClick={() => handleDecrease('numberOfSessions')}>
              <span className="material-symbols-outlined">
                keyboard_arrow_down
              </span>
            </button>
          </div>
        </div>
      </div>
      <div className="daily-goal__container">
        <h3>Your daily goal in hours:</h3>
        <div className="daily-goal__selector">
          <button className="control" onClick={() => handleIncrease('dailyGoal')}>
            <span className="material-symbols-outlined">
              keyboard_arrow_up
            </span>
          </button>
          <div className="number-input" id="session-number">{numberOfHours}</div>
          <button className="control" onClick={() => handleDecrease('dailyGoal')}>
            <span className="material-symbols-outlined">
              keyboard_arrow_down
            </span>
          </button>
        </div>
      </div>

      <button className="goto-timer__btn" onClick={addSessionData}>Select Time</button>
      <button className="close-btn" onClick={handleCancel}>
        <span className="material-symbols-outlined">
          close
        </span>
      </button>
    </div>
  )
}

export default TimeSelector