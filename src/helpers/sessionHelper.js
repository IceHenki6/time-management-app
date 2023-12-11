import { parseISO, isSameDay, format, getDaysInMonth, isSameMonth, isSameYear, daysInWeek, isSameWeek } from "date-fns"

const sessionsOfADay = (sessions, day) => {

  const hoursOfDay = Array.from({ length: 24 }, (_, index) => {
    const hourDate = new Date(day)
    hourDate.setHours(index, 0, 0, 0)
    return {
      hour: format(hourDate, 'HH:00'),
      duration: 0
    }
  })

  sessions.forEach(session => {
    const createdAt = parseISO(session.createdAt)
    const isDay = isSameDay(createdAt, day)

    if (isDay) {
      const sessionHour = format(createdAt, 'HH:00')

      const hourIndex = hoursOfDay.findIndex(entry => entry.hour === sessionHour)
      if (hourIndex !== -1) {
        hoursOfDay[hourIndex].duration += session.duration
      }
    }
  })

  return hoursOfDay
}

const sessionsOfAMonth = (sessions, month) => {
  const days = getDaysInMonth(month)

  const daysOfMonth = Array.from({ length: days }, (_, index) => {
    return {
      day: index + 1,
      duration: 0
    }
  })

  sessions.forEach(session => {
    const createdAt = parseISO(session.createdAt)
    const isMonth = isSameMonth(createdAt, month)

    if (isMonth) {
      const sessionDay = createdAt.getDate()
      const dayIndex = daysOfMonth.findIndex(entry => entry.day === sessionDay)

      if (dayIndex !== -1) {
        daysOfMonth[dayIndex].duration += session.duration
      }
    }
  })

  return daysOfMonth
}

const sessionsOfAYear = (sessions, year) => {
  const monthsOfYear = Array.from({ length: 12 }, (_, index) => {
    return {
      month: index + 1,
      duration: 0
    }
  })
  sessions.forEach(session => {
    const createdAt = parseISO(session.createdAt)
    const isYear = isSameYear(createdAt, year)

    if (isYear) {
      const sessionMonth = createdAt.getMonth()
      const monthIndex = monthsOfYear.findIndex(entry => entry.month === sessionMonth)

      if (monthIndex !== -1) {
        monthsOfYear[monthIndex].duration += session.duration
      }
    }
  })

  return monthsOfYear
}

const sessionsOfAWeek = (sessions, week) => {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
  const daysOfWeek = days.map(day => ({
    day,
    duration: 0
  })) 
  
  sessions.forEach(session => {
    const createdAt = parseISO(session.createdAt)
    const isWeek = isSameWeek(createdAt, week)
    
    if(isWeek){
      const day = format(createdAt, 'EEEE')
      const dayIndex = daysOfWeek.findIndex(entry => entry.day === day)

      if(dayIndex !== -1){
        daysOfWeek[dayIndex].duration += session.duration
      }
    }
  })

  return daysOfWeek
}

const dailyTimeWorked = (sessions, day) => {
  let timeWorked = 0

  sessions.forEach(session => {
    const createdAt = parseISO(session.createdAt)
    const isDay = isSameDay(createdAt, day)

    if(isDay && timeWorked <= (24*60)){
      timeWorked += session.duration
    }
  })

  const dailyProgress = {
    minutesWorked: timeWorked,
    hoursWorked: timeWorked/60
  }

  return dailyProgress
}


//later make the month and year time worked be just one function
const timeWorkedMonth = (sessions, month) => {
  let timeWorked = 0

  sessions.forEach(session => {
    const createdAt = parseISO(session.createdAt)
    const isMonth = isSameMonth(createdAt, month)

    if(isMonth){
      timeWorked += session.duration
    }
  })

  return (timeWorked/60).toFixed(1)
}

const timeWorkedYear = (sessions, year) => {
  let timeWorked = 0

  sessions.forEach(session => {
    const createdAt = parseISO(session.createdAt)
    const isYear = isSameYear(createdAt, year)
    if(isYear){
      timeWorked += session.duration
    }
  })

  return (timeWorked/60).toFixed(1)
}


export default { sessionsOfADay, sessionsOfAMonth, sessionsOfAYear, dailyTimeWorked, sessionsOfAWeek, timeWorkedMonth, timeWorkedYear }