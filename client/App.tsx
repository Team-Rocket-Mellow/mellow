import './App.css'
import { RecoilRoot, } from 'recoil'
import Todolist from "./components/TodoList"
import TodoForm from "./components/TodoForm"
import TodoView from "./components/TodoView"
import TodoStats from "./components/TodoStats"

// —————————————————————————————————————————————————————————————————————————————
// Component

function App() {
  return (
    <RecoilRoot>
      <div id="App">
        <TodoView />
        <TodoStats />
        <TodoForm />
        <Todolist />
      </div>
    </RecoilRoot>
  )
}

// —————————————————————————————————————————————————————————————————————————————
// Export

export default App