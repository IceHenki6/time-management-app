import { useEffect, useState } from "react"

import { useNavigate } from "react-router-dom"

import './timeSelector.css'
import useSelector from "../../hooks/useSelector"

const TimeSelector = ({ selectTime }) => {
  // const [sessionTime, setSessionTime] = useState(25)
  // const [breakTime, setBreakTime] = useState(10)
  // const [numberOfSessions, setNumberOfSessions] = useState(1)
  const sessionTime = useSelector(5, 25, 10, 120)
  const breakTime = useSelector(5, 5, 5, 60)
  const numberOfSessions = useSelector(1, 1, 1, 10)
  // const [numberOfHours, setNumberOfHours] = useState(parseInt(localStorage.getItem('dailyGoal')) || 1)
  const dailyGoal = parseInt(localStorage.getItem('dailyGoal')) || 1
  const numberOfHours = useSelector(1, dailyGoal, 1, 12)

  const navigate = useNavigate()

  useEffect(() => {
    localStorage.setItem('dailyGoal', numberOfHours)
  }, [numberOfHours])

  // const handleIncrease = (name) => {
  //   switch (name) {
  //     case 'sessionTime':
  //       if (sessionTime < 120) {
  //         setSessionTime(prevSessionTime => prevSessionTime + 5)
  //       }
  //       break;
  //     case 'breakTime':
  //       if (breakTime < 60) {
  //         setBreakTime(prevBreakTime => prevBreakTime + 5)
  //       }
  //       break;
  //     case 'numberOfSessions':
  //       if (numberOfSessions < 20) {
  //         setNumberOfSessions(prevNumberOfSessions => prevNumberOfSessions + 1)
  //       }
  //       break;
  //     case 'dailyGoal':
  //       if (numberOfHours < 12) {
  //         setNumberOfHours(prevNumberOfHours => prevNumberOfHours + 1)
  //       }
  //       break;
  //     default:
  //       break;
  //   }
  // }

  // const handleDecrease = (name) => {
  //   switch (name) {
  //     case 'sessionTime':
  //       if (sessionTime > 10) {
  //         setSessionTime(prevSessionTime => prevSessionTime - 5)
  //       }
  //       break;
  //     case 'breakTime':
  //       if (breakTime > 5) {
  //         setBreakTime(prevBreakTime => prevBreakTime - 5)
  //       }
  //       break;
  //     case 'numberOfSessions':
  //       if (numberOfSessions > 1) {
  //         setNumberOfSessions(prevNumberOfSessions => prevNumberOfSessions - 1)
  //       }
  //       break;
  //     case 'dailyGoal':
  //       if (numberOfHours > 1) {
  //         setNumberOfHours(prevNumberOfHours => prevNumberOfHours - 1)
  //       }
  //       break;
  //     default:
  //       break;
  //   }
  // }

  const addSessionData =  () => {
    const sessionData = {
      sessionTime: sessionTime.value,
      breakTime: breakTime.value,
      numberOfSessions: numberOfSessions.value
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
            <button className="control" onClick={sessionTime.increase}>
              <span className="material-symbols-outlined">
                keyboard_arrow_up
              </span>
            </button>
            <div className="number-input" id="session-time">{sessionTime.value}</div>
            <button className="control" onClick={sessionTime.decrease}>
              <span className="material-symbols-outlined">
                keyboard_arrow_down
              </span>
            </button>
          </div>
        </div>
        <div className="selector-container">
          <h1>Break Duration</h1>
          <div className="selector">
            <button className="control" onClick={breakTime.increase}>
              <span className="material-symbols-outlined">
                keyboard_arrow_up
              </span>
            </button>
            <div className="number-input" id="break-time">{breakTime.value}</div>
            <button className="control" onClick={breakTime.decrease}>
              <span className="material-symbols-outlined">
                keyboard_arrow_down
              </span>
            </button>
          </div>
        </div>
        <div className="selector-container">
          <h1>Number of Sessions</h1>
          <div className="session-number__selector">
            <button className="control" onClick={numberOfSessions.increase}>
              <span className="material-symbols-outlined">
                keyboard_arrow_up
              </span>
            </button>
            <div className="number-input" id="session-number">{numberOfSessions.value}</div>
            <button className="control" onClick={numberOfSessions.decrease}>
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
          <button className="control" onClick={numberOfHours.increase}>
            <span className="material-symbols-outlined">
              keyboard_arrow_up
            </span>
          </button>
          <div className="number-input" id="session-number">{numberOfHours.value}</div>
          <button className="control" onClick={numberOfHours.decrease}>
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