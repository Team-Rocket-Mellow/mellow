import "./App.css"
import { RecoilRoot, } from "recoil"
import TodoList from "./components/dashboard/TodoList"
import TodoForm from "./components/dashboard/TodoForm"
import TodoView from "./components/dashboard/TodoView"
import TodoStats from "./components/dashboard/TodoStats"
import Navbar from "./components/navbar/Navbar"

// —————————————————————————————————————————————————————————————————————————————
// Component

function App() {
  return <div id="App">
    <RecoilRoot>
      <Navbar />
      <main>
        <nav>
          <TodoView />
        </nav>
        <section>
          <TodoStats />
          <TodoForm />
          <TodoList />
        </section>
      </main>
    </RecoilRoot>
  </div>
}

// —————————————————————————————————————————————————————————————————————————————
// Export

export default App