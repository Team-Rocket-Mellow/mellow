import './App.css'
import { useState } from 'react'
import { RecoilRoot, } from 'recoil'
import SignUp from './components/login/SignUp'
import SignIn from './components/login/SignIn'
import Todolist from './components/dashboard/TodoList'
import TodoForm from './components/dashboard/TodoForm'
import TodoView from './components/dashboard/TodoView'
import TodoStats from './components/dashboard/TodoStats'
import Navbar from './components/navbar/Navbar'

// —————————————————————————————————————————————————————————————————————————————
// Component

function App() {
  const [auth, setAuth] = useState(false);

  return !auth
    ? <div id="SignIn">
        <Navbar />
        <SignIn />
        <SignUp />
      </div>
    : <>
        <RecoilRoot>
          <Navbar />
          <div id="App">
            <TodoView />
            <TodoStats />
            <TodoForm />
            <Todolist />
          </div>
        </RecoilRoot>
      </>
}

// —————————————————————————————————————————————————————————————————————————————
// Export

export default App