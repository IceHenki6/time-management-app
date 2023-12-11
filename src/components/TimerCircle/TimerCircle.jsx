import './timerCircle.css'


const TimerCircle = ({ percentage, width, radius, minutes, seconds, sessionCounter, numberOfSessions, title }) => {
  const dashArray = radius * Math.PI * 2
  const dashOffset = dashArray - (dashArray * percentage) / 100
  return (
    <div>
      <svg
        width={width}
        height={width}
        viewBox={`0 0 ${width} ${width}`}
      >
        <circle
          cx={width / 2}
          cy={width / 2}
          strokeWidth="15px"
          r={radius}
          className="progress-circle__inner"
        />

        <circle
          cx={width / 2}
          cy={width / 2}
          strokeWidth="15px"
          r={radius}
          className="progress-circle"
          style={{
            strokeDasharray: dashArray,
            strokeDashoffset: dashOffset
          }}
          transform={`rotate(-90 ${width / 2} ${width / 2})`}
        />

        <text x={width/2} y={width/2 - 100} className='timer-circle__title'>{title}</text>
        <text x={width/2} y={width/2 + 10} className='timer-circle__time'>{minutes} : {seconds}</text>
        {numberOfSessions && <text x={width/2} y={width/2 + 100} className='timer-circle__sessions'>{sessionCounter} / {numberOfSessions}</text>}
      </svg>
    </div>
  )
}

export default TimerCircle