import { AuthContext } from "../../context/authContext"
import { useContext, useEffect, useState } from "react"
import { ResponsiveContainer, Bar, BarChart, Tooltip, XAxis, YAxis, Legend, Line, LineChart } from "recharts"
import Sidebar from "../../components/Sidebar/Sidebar"
import './stats.css'
import notificationContext from "../../context/notificationContext"
import sessionHelper from "../../helpers/sessionHelper"
import ProgressCircle from "../../components/ProgressCircle"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"

const Stats = () => {
  const [dayData, setDayData] = useState([])
  const [monthData, setMonthData] = useState([])
  const [yearData, setYearData] = useState([])
  const [dailyTimeWorked, setDailyTimeWorked] = useState([])
  const [percentage, setPercentage] = useState(0)
  const [weekData, setWeekData] = useState([])
  const [monthTimeData, setMonthTimeData] = useState(0)
  const [yearTimeData, setYearTimeData] = useState(0)
  const [dailyGoal, setDailyGoal] = useState(parseInt(localStorage.getItem('dailyGoal')) || 1)

  const axiosPrivate = useAxiosPrivate()
  useEffect(() => {
    let unsubscribed = false
    const getData = async () => {
      try {
        const response = await axiosPrivate.get(`/api/users/sessions`)
        const sessionData = response.data
        if (!unsubscribed){
          const currentDate = new Date()
          const sessionsOfTheDay = sessionHelper.sessionsOfADay(sessionData, currentDate)
          const sessionsOfTheMonth = sessionHelper.sessionsOfAMonth(sessionData, currentDate)
          const sessionsOfTheYear = sessionHelper.sessionsOfAYear(sessionData, currentDate)
          const weeklySessions = sessionHelper.sessionsOfAWeek(sessionData, currentDate)
  
          console.log(`Response: ${sessionData[0]}`)
          const dailyProgress = sessionHelper.dailyTimeWorked(sessionData, currentDate)
          const monthTimeWorked = sessionHelper.timeWorkedMonth(sessionData, currentDate)
          const yearTimeWorked = sessionHelper.timeWorkedYear(sessionData, currentDate)
          
          // console.log(dailyProgress)
          const dailyPercentage = dailyProgress.hoursWorked <= dailyGoal
            ? dailyProgress.hoursWorked / dailyGoal * 100
            : 100
  
          setPercentage(dailyPercentage)
          setDayData(sessionsOfTheDay)
          setMonthData(sessionsOfTheMonth)
          setYearData(sessionsOfTheYear)
          setDailyTimeWorked(dailyProgress)
          setWeekData(weeklySessions)
          setMonthTimeData(monthTimeWorked)
          setYearTimeData(yearTimeWorked)
        }

      } catch (error) {
        //TODO: show error messages
        console.error(error)
      }
    }
    getData()

    return () => unsubscribed = true
  }, [])

  return (
    <div className="page-container stats">
      <Sidebar />
      <div className="chart-container">
        <div className="day-stats">
          <div className="day-stats__description">
            <h4>Your study time today</h4>
            <h2 id="percentage">
              <span>{percentage.toFixed(1)}%</span> 
              towards your goal of <span>{dailyGoal}</span>{dailyGoal > 1 ? "hours" : "hour"}
            </h2>
            <div id="minutes">
              <h3>You were focused for:</h3> <span>{dailyTimeWorked.minutesWorked} minutes</span>
            </div>
          </div>
          <div className="day-progress">
            <ProgressCircle width={150} percentage={percentage.toFixed(1)} radius={60} />
          </div>
        </div>

        <div className="month-stats">
          <div className="month-stats__description">
            <h1>Your focus time of the month</h1>
            <h3><span>{monthTimeData}</span> hours</h3>
          </div>
          <div className="month-chart">
            <ResponsiveContainer width="99%" height="90%" >
              <LineChart data={monthData}>
                {/* <Bar dataKey="duration" fill="#cf754e" /> */}
                <Line
                  type="monotone"
                  dataKey="duration"
                  stroke="#4E7BF0"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="year-stats">
          <div className="year-stats__description">
            <h1>Your focus time of the year</h1>
            <h3><span>{yearTimeData}</span> hours</h3>
          </div>
          <div className="year-chart">
            <ResponsiveContainer width="99%" height="90%" >
              <LineChart data={yearData}>
                <Line
                  type="monotone"
                  dataKey="duration"
                  stroke="#4E7BF0"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="week-stats">
          {/* <h1 id="week">Your focus time this week</h1> */}
          <div className="week-chart">
            <ResponsiveContainer width="99%" height="100%" >
              <BarChart data={weekData}>
                <XAxis dataKey="day" />

                <Tooltip
                  contentStyle={{ background: "#f7f7f7", borderRadius: "4px" }}
                  cursor={{ fill: "none" }}
                />
                <Bar dataKey="duration" fill="#4E7BF0" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
      {/* <Notification/> */}
    </div>
  )
}

export default Stats