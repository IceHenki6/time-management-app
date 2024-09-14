import './Timer.css'
import { React, useState, useEffect, useContext, useRef } from "react";
import { TaskContext } from '../../context/taskContext';
import { useNavigate } from 'react-router-dom';

import Sidebar from '../../components/Sidebar/Sidebar';
import FinishedSession from '../../components/FinishedSession/FinishedSession';
import TimeSelector from '../../components/TimeSelector/TimeSelector';
import TimerCircle from '../../components/TimerCircle/TimerCircle';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import useWindowSize from '../../hooks/useWindowSize';
import MobileNavbar from '../../components/MobileNavbar/MobileNavbar';
import notificationSound from '../../assets/notification-sound.mp3'

import { getMinutes, getSeconds } from '../../helpers/timeHelper' 

const Timer = () => {
  const { getTask, setTask } = useContext(TaskContext)
  const task = getTask()
  const [sessionData, setSessionData] = useState(null)

  const axiosPrivate = useAxiosPrivate()

  //const [isSessionTimeRunning, setIsSessionTimeRunning] = useState(false)
  //const [sessionTimeLeft, setSessionTimeLeft] = useState(0)
  const [showFinishedSessions, setShowFinishedSessions] = useState(false)
  const [sessionCounter, setSessionCounter] = useState(0)

  const [numberOfSessions, setNumberOfSesisons] = useState()

  const [initialSessionTime, setInitialSessionTime] = useState(null)
  const [sessionProgress, setSessionProgress] = useState(0)

  const [sessionStarted, setSessionStarted] = useState(false)
  const [timerRunning, setTimerRunning] = useState(false)
  const [timeLeft, setTimeLeft] = useState(null)
  const [isSession, setIsSession] = useState(true)
  const [stageTitle, setStageTitle] = useState('Session')
  // const [sessionTimerStarted, setSessionTimerStarted] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  //get window size
  const width = useWindowSize()


  //breakTime
  // const [isBreakTimeRunning, setIsBreakTimeRunning] = useState(false)
  // const [breakTimeLeft, setBreakTimeLeft] = useState(null)
  const [initialBreakTime, setInitialBreakTime] = useState(null)
  const [breakProgress, setBreakProgress] = useState(0)
  // const [breakTimerStarted, setBreakTimerStarted] = useState(false)

  //pulser
  const [showPulser, setShowPulser] = useState(false)

  //time selectors
  const [showTimeSelectors, setShowTimeSelectors] = useState(true)

  const navigate = useNavigate()


  // const [time, setTime] = useState({
  //   minutes: initialSessionTime.toString().padStart(2, '0'),
  //   seconds: '00'
  // })

  // const [bTime, setBTime] = useState({
  //   minutes: initialBreakTime.toString().padStart(2, '0'),
  //   seconds: '00'
  // })


  const saveSessionWithTask = async (totalTime) => {

    const newObj = {
      "taskId": task.id,
      "duration": sessionData.sessionTime
    }

    const updatedTime = task.totalTime + totalTime

    const newTaskObj = {
      "name": task.name,
      "completed": task.completed,
      "totalTime": updatedTime
    }

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

  const playNotificationSound = async () => {
    if (!notificationSound || !isMounted) {
      console.error('Notification sound is not defined')
      return
    }
    try {
      const audio = new Audio(notificationSound)
      audio.addEventListener('canplaythrough', async () => {
        await audio.play();
        audio.addEventListener('ended', () => {
          audio.pause()
        })
      })
    } catch (error) {
      console.error(error)
    }
  }

  //fixed timer
  const workerRef = useRef(null);

  const startTimer = (time) => {
    if (workerRef.current) {
      console.log('terminates')
      workerRef.current.terminate()
    }
    setTimerRunning(true)

    workerRef.current = new Worker(new URL('../../workers/timerWorker.js', import.meta.url))

    console.log(isSession)

    // const duration = isSession ? sessionDuration : breakDuration
    // console.log(duration)


    workerRef.current.postMessage({ time })

    workerRef.current.onmessage = function (e) {
      setTimeLeft(e.data)
      setSessionProgress((time - e.data) / (time) * 100)
      if (e.data === 0) {
        setTimerRunning(false)
        console.log('terminates')
        workerRef.current.terminate()
        workerRef.current = null
        if(isSession) {
          setSessionCounter(sessionCounter + 1)
        }
        setIsSession(!isSession)
        //finishSession()
      }
    }
    console.log('executes')
  }

  const stopTimer = () => {
    if (workerRef.current) {
      setTimerRunning(false)
      console.log('terminates')
      workerRef.current.terminate()
      workerRef.current = null
    }
  }

  useEffect(() => {
    setIsMounted(true)
    if (sessionStarted) {
      if (sessionCounter < numberOfSessions) {
        if (!isSession) {
          console.log('FINISHING SESSIon')
          if(task){
            console.log('A session should be saved to a task')
          } else {
            console.log('A session should be saved')
          }
          //setSessionCounter(sessionCounter + 1)
          setShowPulser(true)
          playNotificationSound()
          setTimeout(() => {
            setStageTitle('Break')
            setShowPulser(false)
            startTimer(initialBreakTime)
          }, 4000);
        } else {
          console.log('break finished')
          //setIsSession(true)
          setShowPulser(true)
          playNotificationSound()
          setTimeout(() => {
            setStageTitle('Session')
            setShowPulser(false)
            startTimer(initialSessionTime)
          }, 4000);
        }


      } else {
        if(task){
          const totalTime = sessionData.sessionTime * sessionCounter
          console.log(`A session should be saved to a task, total time: ${totalTime}, current session: ${sessionCounter}`)
        } else {
          console.log('A session should be saved')
        }
        setShowPulser(true)
        playNotificationSound()
        setTimeout(() => {
          stopTimer()
          setShowPulser(false)
          setShowFinishedSessions(true)
        }, 4000);
      }
    }
    return (() => {
      setIsMounted(false)
    })
  }, [isSession])

  //session countdown
  // useEffect(() => {
  //   let intervalId = null
  //   setIsMounted(true)
  //   if (isSessionTimeRunning) {

  //     if (sessionTimeLeft > 0) {
  //       intervalId = setInterval(() => {
  //         setSessionTimeLeft(prevTime => prevTime - 1)
  //         setSessionProgress((initialSessionTime * 60 - sessionTimeLeft) / (initialSessionTime * 60) * 100)
  //       }, 1000)
  //     } else {
  //       clearInterval(intervalId)
  //       setIsSessionTimeRunning(false)
  //       // setSessionTimerStarted(false)

  //       const updatedSessionCounter = sessionCounter + 1
  //       setSessionCounter(updatedSessionCounter)

  //       // console.log('session saved!')
  //       if (task) {
  //         const totalTime = updatedSessionCounter * sessionData.sessionTime
  //         saveSessionWithTask(totalTime)
  //       } else {
  //         saveSession()
  //       }

  //       setShowPulser(true)
  //       playNotificationSound()
  //       if (updatedSessionCounter !== sessionData.numberOfSessions) {
  //         setTimeout(() => {
  //           setSessionProgress(0)
  //           setBreakTimeLeft(1 * 60)
  //           setIsBreakTimeRunning(true)
  //           setBreakTimerStarted(true)
  //           setShowPulser(false)
  //         }, 5000)
  //       } else {
  //         setTimeout(() => {
  //           setShowPulser(false)
  //           setShowFinishedSessions(true)
  //         }, 5000)
  //       }
  //     }
  //   } else {
  //     clearInterval(intervalId)
  //   }
  //   return (() => {
  //     clearInterval(intervalId)
  //     setIsMounted(false)
  //   })
  // }, [isSessionTimeRunning, sessionTimeLeft])

  // useEffect(() => {
  //   const minutes = Math.floor(sessionTimeLeft / 60)
  //   const seconds = sessionTimeLeft % 60

  //   const newTime = {
  //     minutes: minutes.toString().padStart(2, '0'),
  //     seconds: seconds.toString().padStart(2, '0')
  //   }

  //   setTime(newTime)
  // }, [sessionTimeLeft])


  // //break countdown
  // useEffect(() => {
  //   let intervalId = null
  //   setIsMounted(true)
  //   if (isBreakTimeRunning) {

  //     if (breakTimeLeft > 0) {
  //       intervalId = setInterval(() => {
  //         setBreakTimeLeft(prevTime => prevTime - 1)
  //         setBreakProgress((initialBreakTime * 60 - breakTimeLeft) / (initialBreakTime * 60) * 100)
  //       }, 1000)
  //     } else {
  //       clearInterval(intervalId)
  //       setIsBreakTimeRunning(false)
  //       setBreakTimerStarted(false)
  //       setShowPulser(true)
  //       playNotificationSound()
  //       setTimeout(() => {
  //         setBreakProgress(0)
  //         setSessionTimeLeft(1 * 60)
  //         setIsSessionTimeRunning(true)
  //         // setSessionTimerStarted(true)
  //         setShowPulser(false)
  //       }, 5000)
  //     }
  //   } else {
  //     clearInterval(intervalId)
  //   }
  //   return (() => {
  //     clearInterval(intervalId)
  //     setIsMounted(false)
  //   })
  // }, [isBreakTimeRunning, breakTimeLeft])

  // useEffect(() => {
  //   const minutes = Math.floor(breakTimeLeft / 60)
  //   const seconds = breakTimeLeft % 60

  //   const newTime = {
  //     minutes: minutes.toString().padStart(2, '0'),
  //     seconds: seconds.toString().padStart(2, '0')
  //   }

  //   setBTime(newTime)
  // }, [breakTimeLeft])

  const handleGoBack = () => {
    stopTimer()
    setTask(null)
    navigate('/todo')
  }


  // const handleStart = () => {
  //   setIsSessionTimeRunning(true)
  //   setSessionTimerStarted(true)
  // }
  
  const handleStart = () => {
    setSessionStarted(true)
    startTimer(initialSessionTime)
  }

  const selectTime = (newSessionData) => {
    //setInitialSessionTime(newSessionData.sessionTime * 60)
    const sessionTimeSeconds = newSessionData.sessionTime * 60
    setInitialSessionTime(60)
    setNumberOfSesisons(newSessionData.numberOfSessions)

    //setInitialBreakTime(newSessionData.breakTime * 60)
    const breakTimeSeconds = newSessionData.breakTime * 60
    setInitialBreakTime(20)
    setSessionData(newSessionData)

    setTimeLeft(isSession ? sessionTimeSeconds : breakTimeSeconds)
    toggleTimeSelector()
  }

  const toggleTimeSelector = () => {
    setShowTimeSelectors(!showTimeSelectors)
  }

  return (
    <div className="page-container timer-container">
      <Sidebar />
      <MobileNavbar />
      <div className="timer">
        <div className="time-display__container">
          {(sessionStarted || initialSessionTime) && <TimerCircle
            width={400}
            radius={width > 768 ? 190 : 145}
            percentage={sessionProgress}
            title={stageTitle}
            minutes={getMinutes(timeLeft).toString().padStart(2, '0')}
            seconds={getSeconds(timeLeft).toString().padStart(2, '0')}
            sessionCounter={sessionCounter}
            numberOfSessions={numberOfSessions}
          />
          }

          {showPulser && <div className="pulser"></div>}
        </div>



        <div className='timer-buttons__container'>
          {!sessionStarted && <button className="start__btn" onClick={handleStart}>Start</button>}
          {!sessionStarted && <button className='toggle-time-selectors__btn' onClick={toggleTimeSelector}><span className="material-symbols-outlined">
            chronic
          </span></button>}
          {sessionStarted && <button className='cancel__btn' onClick={handleGoBack}>
            <span className="material-symbols-outlined">
              cancel
            </span>
            Cancel
          </button>}
        </div>
        {showFinishedSessions && <FinishedSession timeFocused={sessionCounter * initialSessionTime} />}
        {/* {(timeLeft === 0 && showFinishedTimer) && <FinishedTimer task={task} saveTask={saveTask} />} */}
        {showTimeSelectors && <TimeSelector selectTime={selectTime} />}
      </div>
    </div>
  )
}

export default Timer