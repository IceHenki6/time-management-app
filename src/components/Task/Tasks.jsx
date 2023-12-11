
import { useState } from "react"

import './task.css'


const Task = ({ task, removeTask }) => {
  const [visible, setVisible] = useState(false)

  const show = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleRemove = (id) => {
    removeTask(id)
  }

  // const handleContinue = () => {
  //   resumeTask(task)
  // }

  const isoDate = new Date(task.updatedAt)
  const date = `${isoDate.getDate()}-${isoDate.getMonth() + 1}-${isoDate.getFullYear()}`

  return (
    <div className="task">
      <div className="task-preview" onClick={toggleVisibility}>
        <div className="left-side">
          <span className="material-symbols-outlined check-box__checked">
            select_check_box
          </span>
          <h3 className="task-name__list">{task.name}</h3>
        </div>

        <div className="right-side">
          {!visible && <span className="material-symbols-outlined expand-icon">
            expand_more
          </span>}
          {visible && <span className="material-symbols-outlined expand-icon">
            expand_less
          </span>}
        </div>
      </div>

      <div className="task-details__container" style={show}>
        <div className="task-details">
          <div>
            <h3>You worked on this task:</h3>
            <p>{task.totalTime} minutes</p>
          </div>

          <div>
            <h3>Last time: </h3>
            <p>{date}</p>
          </div>

          <span className="material-symbols-outlined delete-icon" onClick={() => { handleRemove(task.id) }}>
            delete
          </span>
        </div>
        {/* <button onClick={handleContinue} className="continue-btn">Continue</button> */}
      </div>
    </div>
  )
}
const Tasks = ({ tasks, removeTask }) => {
  // const { setTask } = useContext(TaskContext)
  // const navigate = useNavigate()
  const reversed = tasks.reverse()

  return (
    <div className="tasks">
      {reversed.map(task => <Task key={task.name} task={task} removeTask={removeTask} />)}
    </div>
  )
}
export default Tasks