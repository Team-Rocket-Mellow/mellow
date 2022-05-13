import './App.css'
import { RecoilRoot, } from 'recoil'
import Todolist from './components/dashboard/TodoList'
import TodoForm from './components/dashboard/TodoForm'
import TodoView from './components/dashboard/TodoView'
import TodoStats from './components/dashboard/TodoStats'
import Navbar from './components/navbar/Navbar'
import SignUp from './components/login/SignUp'
import SignIn from './components/login/SignIn'

// —————————————————————————————————————————————————————————————————————————————
// Component

function App() {
  return (
    <>
      <Navbar />
      <RecoilRoot>
        <div id="App">
          <TodoView />
          <TodoStats />
          <TodoForm />
          <Todolist />
        </div>
      </RecoilRoot>
      <SignUp />
      <SignIn />
    </>
  )
}

// —————————————————————————————————————————————————————————————————————————————
// Export

export default App