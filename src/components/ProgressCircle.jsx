import React from "react"

const ProgressCircle = ({ percentage, width, radius }) => {
  const dashArray = radius * Math.PI * 2
  const dashOffset = dashArray - (dashArray * percentage) / 100

  return (
    <div className="progress-circle__container">
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
          transform={`rotate(-90 ${width / 2} ${width/2})`}
        />

        <text className="stats-circle__text" x={width/2} y={width/2 + 5} >{percentage}%</text>
      </svg>
    </div>
  )
}

export default ProgressCircle