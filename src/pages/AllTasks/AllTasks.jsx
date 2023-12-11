import { useState, useEffect, useContext } from 'react';
import Sidebar from "../../components/Sidebar/Sidebar"
import taskService from '../../services/taskService';
import Tasks from '../../components/Task/Tasks';
import NoTasks from '../../components/NoTasks/NoTasks'
import { AuthContext } from '../../context/authContext';
import './AllTasks.css'

import notificationContext from '../../context/notificationContext';
import Notification from '../../components/Notification';
import useProtectedResource from '../../hooks/useResource';

const AllTasks = () => {


  const [allTasks, allTasksService] = useProtectedResource('/api/tasks')
  const { currentUser } = useContext(AuthContext)

  const [notification, dispatch] = useContext(notificationContext)

  const removeTask = async (id) => {
    // try {
    //   const deletedTask = await taskService.remove(id)
    //   const tasks = await taskService.getAll()
    //   setAllTasks(tasks.reverse())
    //   dispatch({
    //     type: 'DELETE'
    //   })
    //   setTimeout(() => {
    //     dispatch( {type: 'CLEAR'} )
    //   }, 4000)
    // } catch (error) {
    //   console.log(error)
    //   dispatch({
    //     type: 'ERROR',
    //     message: {error}
    //   })
    //   setTimeout(() => {
    //     dispatch( {type: 'CLEAR'} )
    //   }, 4000)
    // }
    allTasksService.remove(id)
  }

  return (
    <div className="page-container all-tasks__container">
      <Sidebar />
      <div className="all-tasks">
        <h2 className='all-tasks__title'>Tasks</h2>
        {allTasks.length > 0 && <Tasks tasks={allTasks} removeTask={removeTask} />}
        {/* <img src={taskListImgOne} id='task-list-img__one' alt="" />
        <img src={taskListImgTwo} id='task-list-img__two' alt="" /> */}
        {/* <Notification/> */}
        {allTasks.length < 1 && <NoTasks message={"You have currently no tasks to display."}/>}
      </div>
    </div>
  )
}

export default AllTasks