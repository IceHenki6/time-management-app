import React from "react"
import './progressSemicircle.css'

const ProgressSemicircle = ({ percentage }) => {
  return (
    <div className="semicircle-progress" style={{'--percentage': `${percentage}`}}></div>
  );
}

export default ProgressSemicircle
