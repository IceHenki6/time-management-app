import { Outlet, Routes, Route } from 'react-router-dom'
import './App.css'
import TodoList from './pages/TimeManager/TodoList'
import AllTasks from './pages/AllTasks/AllTasks'
import HomePage from './pages/HomePage/HomePage'
import Login from './pages/Login/Login'
import Timer from './pages/Timer/Timer'
import Stats from './pages/Stats/Stats'
import Account from './pages/Account/Account'
import SignUp from './pages/SignUp/SignUp'
import Missing from './components/Missing'
import Protected from './utils/Protected'
import PersistLogin from './components/PersistLogin'

const Layout = () => {
  return (
    <main className='app'>
      <Outlet />
    </main>
  )
}

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        {/* public */}
        <Route element={<PersistLogin/>}>
          <Route path='/' element={<HomePage />} />
        </Route>
        
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<SignUp />} />

        {/* protected */}
        <Route element={<PersistLogin/>}>
          <Route element={<Protected />}>
            <Route path='/todo' element={<TodoList />} />
            <Route path='/timer' element={<Timer />} />
            <Route path='/tasks' element={<AllTasks />} />
            <Route path='/stats' element={<Stats />} />
            <Route path='/account' element={<Account />} />
          </Route>
        </Route>
        {/* non existant */}
        <Route path='/*' element={<Missing />} />
      </Route>
    </Routes>
  )
}

export default App