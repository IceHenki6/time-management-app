import './todoItem.css'


const CompletedItem = ({ task, updateTask }) => {

  const uncheckItem = () => {
    const newObj = {
      "name": task.name,
      "completed": false,
      "totalTime": task.totalTime 
    }

    updateTask(newObj, task.id)
  }

  const timeInHours = task.totalTime/60

  return (
    <div className='todo-item'>
      <div className="left-side">
        <button className="check-btn" onClick={uncheckItem}>
          <span className="material-symbols-outlined check-box__checked">
            select_check_box
          </span>
        </button>
        <p className='task-date'>{task.date}</p>
        <h3 className='task-name'>{task.name}</h3>
      </div>
      <div className="right-side">
        <p className='task-time'>Time Studied - Worked: {Number.isInteger(timeInHours) ? timeInHours : timeInHours.toFixed(1)} h</p>
      </div>
    </div>
  )
}

export default CompletedItem