
import Sidebar from "../../components/Sidebar/Sidebar"
import Tasks from '../../components/Task/Tasks';
import NoTasks from '../../components/NoTasks/NoTasks'
import './AllTasks.css'


import useProtectedResource from '../../hooks/useResource';

const AllTasks = () => {


  const [allTasks, allTasksService] = useProtectedResource('/api/tasks')


  const removeTask = async (id) => {
    allTasksService.remove(id)
  }

  return (
    <div className="page-container all-tasks__container">
      <Sidebar />
      <div className="all-tasks">
        <h2 className='all-tasks__title'>Tasks</h2>
        {allTasks.length > 0 && <Tasks tasks={allTasks} removeTask={removeTask} />}
        {allTasks.length < 1 && <NoTasks message={"You have currently no tasks to display."}/>}
      </div>
    </div>
  )
}

export default AllTasks