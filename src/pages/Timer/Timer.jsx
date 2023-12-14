import './Timer.css'
import { React, useState, useEffect, useContext } from "react";
import { TaskContext } from '../../context/taskContext';
import { useNavigate } from 'react-router-dom';

import Sidebar from '../../components/Sidebar/Sidebar';
import FinishedSession from '../../components/FinishedSession/FinishedSession';
import TimeSelector from '../../components/TimeSelector/TimeSelector';
import TimerCircle from '../../components/TimerCircle/TimerCircle';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import useWindowSize from '../../hooks/useWindowSize';


const Timer = () => {
  const { getTask, setTask } = useContext(TaskContext)
  const task = getTask()
  const [sessionData, setSessionData] = useState(null)

  const axiosPrivate = useAxiosPrivate()

  const [isSessionTimeRunning, setIsSessionTimeRunning] = useState(false)
  const [sessionTimeLeft, setSessionTimeLeft] = useState(1 * 60)
  const [showFinishedSessions, setShowFinishedSessions] = useState(false)
  const [sessionCounter, setSessionCounter] = useState(0)
 
  const [initialSessionTime, setInitialSessionTime] = useState(1)
  const [sessionProgress, setSessionProgress] = useState(0)
  const [sessionTimerStarted, setSessionTimerStarted] = useState(false)

  //get window size
  const width = useWindowSize()
  

  //breakTime
  const [isBreakTimeRunning, setIsBreakTimeRunning] = useState(false)
  const [breakTimeLeft, setBreakTimeLeft] = useState(null)
  const [initialBreakTime, setInitialBreakTime] = useState(1)
  const [breakProgress, setBreakProgress] = useState(0)
  const [breakTimerStarted, setBreakTimerStarted] = useState(false)

  //pulser
  const [showPulser, setShowPulser] = useState(false)

  //time selectors
  const [showTimeSelectors, setShowTimeSelectors] = useState(true)

  const navigate = useNavigate()


  const [time, setTime] = useState({
    minutes: initialSessionTime.toString().padStart(2, '0'),
    seconds: '00'
  })

  const [bTime, setBTime] = useState({
    minutes: initialBreakTime.toString().padStart(2, '0'),
    seconds: '00'
  })


  const saveSessionWithTask = async (totalTime) => {

    const newObj = {
      "taskId": task.id,
      "duration": sessionData.sessionTime
    }

    const updatedTime = task.totalTime + totalTime
    console.log(`updated time: ${updatedTime}`)

    const newTaskObj = {
      "name": task.name,
      "completed": task.completed,
      "totalTime": updatedTime
    }

    console.log(`updated task: ${newTaskObj}`)
    try {
      await axiosPrivate.post('/api/sessions', newObj)
      await axiosPrivate.put(`/api/tasks/${task.id}`, newTaskObj)
      console.log("session created")
    } catch (error) {
      console.error(error)
    }

    //   localStorage.setItem('last-duration', JSON.stringify(initialTime))
    //   setShowFinishedTimer(false)
  }

  const saveSession = async () => {
    const newObj = {
      "duration": sessionData.sessionTime
    }

    try {
      await axiosPrivate.post('/api/sessions', newObj)
    } catch (error) {
      console.error(error)
    }
  }

  //session countdown
  useEffect(() => {
    let intervalId = null
    if (isSessionTimeRunning) {

      if (sessionTimeLeft > 0) {
        intervalId = setInterval(() => {
          setSessionTimeLeft(prevTime => prevTime - 1)
          setSessionProgress((initialSessionTime * 60 - sessionTimeLeft) / (initialSessionTime * 60) * 100)
        }, 1000)
      } else {
        clearInterval(intervalId)
        setIsSessionTimeRunning(false)
        // setSessionTimerStarted(false)

        const updatedSessionCounter = sessionCounter + 1
        setSessionCounter(updatedSessionCounter)

        // console.log('session saved!')
        if (task) {
          const totalTime = updatedSessionCounter * sessionData.sessionTime
          saveSessionWithTask(totalTime)
        } else {
          saveSession()
        }

        setShowPulser(true)
        if (updatedSessionCounter !== sessionData.numberOfSessions) {
          setTimeout(() => {
            setSessionProgress(0)
            setBreakTimeLeft(1 * 60)
            setIsBreakTimeRunning(true)
            setBreakTimerStarted(true)
            setShowPulser(false)
          }, 5000)
        } else {
          setTimeout(() => {
            setShowPulser(false)
            setShowFinishedSessions(true)
          }, 5000)
        }
      }
    } else {
      clearInterval(intervalId)
    }
    return (() => {
      clearInterval(intervalId)
    })
  }, [isSessionTimeRunning, sessionTimeLeft])

  useEffect(() => {
    const minutes = Math.floor(sessionTimeLeft / 60)
    const seconds = sessionTimeLeft % 60

    const newTime = {
      minutes: minutes.toString().padStart(2, '0'),
      seconds: seconds.toString().padStart(2, '0')
    }

    setTime(newTime)
  }, [sessionTimeLeft])


  //break countdown
  useEffect(() => {
    let intervalId = null
    if (isBreakTimeRunning) {

      if (breakTimeLeft > 0) {
        intervalId = setInterval(() => {
          setBreakTimeLeft(prevTime => prevTime - 1)
          setBreakProgress((initialBreakTime * 60 - breakTimeLeft) / (initialBreakTime * 60) * 100)
        }, 1000)
      } else {
        clearInterval(intervalId)
        setIsBreakTimeRunning(false)
        setBreakTimerStarted(false)
        setShowPulser(true)
        setTimeout(() => {
          setBreakProgress(0)
          setSessionTimeLeft(1 * 60)
          setIsSessionTimeRunning(true)
          // setSessionTimerStarted(true)
          setShowPulser(false)
        }, 5000)
      }
    } else {
      clearInterval(intervalId)
    }
    return (() => {
      clearInterval(intervalId)
    })
  }, [isBreakTimeRunning, breakTimeLeft])

  useEffect(() => {
    const minutes = Math.floor(breakTimeLeft / 60)
    const seconds = breakTimeLeft % 60

    const newTime = {
      minutes: minutes.toString().padStart(2, '0'),
      seconds: seconds.toString().padStart(2, '0')
    }

    setBTime(newTime)
  }, [breakTimeLeft])

  const handleGoBack = () => {
    setTask(null)
    navigate('/todo')
  }


  const handleStart = () => {
    setIsSessionTimeRunning(true)
    setSessionTimerStarted(true)
  }

  const selectTime = (newSessionData) => {
    setSessionData(newSessionData)
    setShowTimeSelectors(!showTimeSelectors)
  }

  const breakBackground = isBreakTimeRunning ? { 'color': 'var(--main-font-color' } : { 'color': 'var(--very-light-grey)' }
  const sessionBackground = isSessionTimeRunning ? { 'color': 'var(--main-font-color' } : { 'color': 'var(--very-light-grey)' }

  return (
    <div className="page-container timer-container">
      <Sidebar />
      <div className="timer">
        {sessionData && <div className="time-display__container">
          {(isSessionTimeRunning || !sessionTimerStarted || !isBreakTimeRunning) && <TimerCircle 
            width={400}
            radius={ width > 768 ? 190 : 145} 
            percentage={sessionProgress} 
            title={"Session"} 
            minutes={time.minutes}
            seconds={time.seconds}
            sessionCounter={sessionCounter}
            numberOfSessions={sessionData.numberOfSessions}
            />
          }
          {isBreakTimeRunning && <TimerCircle 
            width={400}
            radius={width > 768 ? 190 : 145} 
            percentage={breakProgress} 
            title={"Break"} 
            minutes={bTime.minutes}
            seconds={bTime.seconds}
            />
          }
          {showPulser && <div className="pulser"></div>}
        </div>}



        <div>
          {!sessionTimerStarted && <button className="start__btn" onClick={handleStart}>Start</button>}
          {sessionTimerStarted && <button className='cancel__btn' onClick={handleGoBack}>
            <span className="material-symbols-outlined">
              cancel
            </span>
            Cancel
          </button>}
        </div>
        {showFinishedSessions && <FinishedSession timeFocused={sessionCounter * sessionData.sessionTime} />}
        {/* {(timeLeft === 0 && showFinishedTimer) && <FinishedTimer task={task} saveTask={saveTask} />} */}
        {showTimeSelectors && <TimeSelector selectTime={selectTime} />}
      </div>
    </div>
  )
}

export default Timer