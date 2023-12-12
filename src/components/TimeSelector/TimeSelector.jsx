import { useEffect, useState } from "react"

import { useNavigate } from "react-router-dom"

import './timeSelector.css'
import useSelector from "../../hooks/useSelector"

const Selector = ({ selectedTime, title }) => {

  return (
    <div className="selector-container">
      <h1>{title}</h1>
      <div className="selector">
        <button className="control" onClick={selectedTime.increase}>
          <span className="material-symbols-outlined">
            keyboard_arrow_up
          </span>
        </button>
        <div className="number-input" id="session-time">{selectedTime.value}</div>
        <button className="control" onClick={selectedTime.decrease}>
          <span className="material-symbols-outlined">
            keyboard_arrow_down
          </span>
        </button>
      </div>
    </div>

  )
}

const TimeSelector = ({ selectTime }) => {
  const sessionTime = useSelector(5, 25, 10, 120)
  const breakTime = useSelector(5, 5, 5, 60)
  const numberOfSessions = useSelector(1, 1, 1, 10)
  const dailyGoal = parseInt(localStorage.getItem('dailyGoal')) || 1
  const numberOfHours = useSelector(1, dailyGoal, 1, 12)

  const navigate = useNavigate()

  useEffect(() => {
    localStorage.setItem('dailyGoal', numberOfHours)
  }, [numberOfHours])


  const addSessionData = () => {
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
        <Selector selectedTime={sessionTime} title={'Session Duration'}/>
        <Selector selectedTime={breakTime} title={'Break Duration'}/>
        <Selector selectedTime={numberOfSessions} title={'Number of Sessions'} />
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