import { useContext } from 'react'
import './todoItem.css'
import { TaskContext } from '../../context/taskContext'
import { useNavigate } from 'react-router-dom'


const TodoItem = ({ task, updateTask }) => {
  const { setTask } = useContext(TaskContext)
  const navigate = useNavigate()

  const checkItem = () => {
    const newObj = {
      "name": task.name,
      "completed": true,
      "totalTime": task.totalTime 
    }

    updateTask(newObj, task.id)
  }

  const handleStartTimer = () => {
    setTask(task)
    navigate('/timer')
  }

  const timeInHours = task.totalTime/60

  return (
    <div className='todo-item'>
      <div className="left-side">
        <button className="check-btn" onClick={checkItem}>
          <span className="material-symbols-outlined check-box__unchecked">
            check_box_outline_blank
          </span>
        </button>
        <p className='task-date'>{task.date}</p>
        <h3 className='task-name'>{task.name}</h3>
      </div>
      <div className="right-side">
        <p className='task-time'>Time Studied - Worked: {Number.isInteger(timeInHours) ? timeInHours : timeInHours.toFixed(1)} h</p>
        <button className='timer-btn' onClick={handleStartTimer}>Timer</button>
      </div>
    </div>
  )
}

export default TodoItem