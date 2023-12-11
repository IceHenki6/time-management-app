import './noTasks.css'
import noTasksImg from '../../images/notasks.svg'

const NoTasks = ({message}) => {

  return(
    <div className="no-tasks">
      <img src={noTasksImg} alt="" className='no-tasks__img' />
      <h1 className='no-tasks__message'>{message}</h1>
    </div>
  )
}

export default NoTasks