import './App.css'
import { RecoilRoot, } from 'recoil'
import Todolist from './components/dashboard/TodoList'
import TodoForm from './components/dashboard/TodoForm'
import TodoView from './components/dashboard/TodoView'
import TodoStats from './components/dashboard/TodoStats'
import Navbar from './components/navbar/Navbar'

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
    </>
  )
}

// —————————————————————————————————————————————————————————————————————————————
// Export

export default App