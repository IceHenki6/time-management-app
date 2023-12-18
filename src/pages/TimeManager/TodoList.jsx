import { useState, useRef, useEffect, useContext } from 'react';
import './TodoList.css'
import Sidebar from '../../components/Sidebar/Sidebar';
import TodoItem from '../../components/TodoList/TodoItem';

import CompletedItem from '../../components/TodoList/CompletedItem';
import NoTasks from '../../components/NoTasks/NoTasks';
import useProtectedResource from '../../hooks/useResource';
import MobileNavbar from '../../components/MobileNavbar/MobileNavbar';



const AddTaskForm = ({ toggleNewTaskInput, createTask }) => {
  const [taskName, setTaskName] = useState('')
  const [focused, setFocused] = useState(false)

  const addTask = async (event) => {
    event.preventDefault()
    const newTask = {
      "name": taskName
    }

    createTask(newTask)

    setTaskName('')
    toggleNewTaskInput()
  }

  return (
    <div className='task-form__container'>
      <div>
        <h1 className='task-form__title'>Add task</h1>
        <form onSubmit={addTask} id="task-form">
          <input
            type="text"
            name="task-name"
            placeholder="Enter the task name"
            value={taskName}
            id="task-name__input"
            onChange={({ target }) => { setTaskName(target.value) }}
            onFocus={() => { setFocused(true) }}
            focused={focused.toString()}
            minLength={1}
            maxLength={30}
            required={true}
          />
          <button>Create Task</button>
        </form>
        <button className="close-btn">
          <span className="material-symbols-outlined" onClick={toggleNewTaskInput}>
            close
          </span>
        </button>
      </div>
    </div>
  )
}


const TodoList = () => {
  const [todoTasks, setTodoTasks] = useState([])
  const [lastTenCompleted, setLastTenCompleted] = useState([])
  const [showNewTaskInput, setShowNewTaskInput] = useState(false)
  const [tasks, tasksService] = useProtectedResource('/api/tasks')


  useEffect(() => {
    const completedTasks = tasks.filter(task => task.completed)
    const lastTen = completedTasks.slice(-10)
    setLastTenCompleted(lastTen.reverse())

    const todo = tasks.filter(task => !task.completed)
    setTodoTasks(todo)
  }, [tasks])


  const updateTask = async (task, id) => {
    tasksService.update(task, id)
  }

  const createTask = async(newTask) => {
    tasksService.create(newTask)
  }


  const toggleNewTaskInput = () => {
    setShowNewTaskInput(!showNewTaskInput)
  }


  return (
    <div className="page-container time-manager__container">
      <Sidebar />
      <MobileNavbar />
      <div className="time-manager">
        <div className="todo-list__container">
          <div className="todo-header">
            <h1>Your tasks:</h1>
          </div>
          <div className="todo-list">
            <div className="incomplete-tasks">
              <h3 className='todo-title'>To do:</h3>
              {todoTasks.map(task => <TodoItem key={task.id} task={task} updateTask={updateTask}/>)}
              {todoTasks.length < 1 && <NoTasks message={"You have no tasks to do, press Add Task to add one."}/>}
            </div>
            {lastTenCompleted.length > 0 && <div className="completed-tasks">
              <h3 className='completed-title'>Completed:</h3>
              {lastTenCompleted.map(task => <CompletedItem key={task.id} task={task} updateTask={updateTask} />)}
            </div>}
          </div>
          <div className="add-task__container">
            {!showNewTaskInput && <button className="add-task__btn" onClick={toggleNewTaskInput} >Add task</button>}
          </div>
        </div>
        {showNewTaskInput && <AddTaskForm toggleNewTaskInput={toggleNewTaskInput} createTask={createTask}/>}
        
      </div>
    </div>
  );
}

export default TodoList