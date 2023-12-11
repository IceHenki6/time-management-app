import React from "react"
import './progressSemicircle.css'

const BottomProgressSemicircle = ({ percentage }) => {
  return (
    <div className="bottom-semicircle-progress" style={{'--percentage': `${percentage}`}}></div>
  );
}

export default BottomProgressSemicircle