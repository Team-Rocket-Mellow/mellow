import TodoForm from "../components/dashboard/TodoForm"
import TodoList from "../components/dashboard/TodoList"
import TodoView from "../components/dashboard/TodoView"
import NavBar from "../components/navbar/Navbar"

function HomePage() {
  return (
    <div id="HomePage">
      <NavBar />
      <main>
        <nav>
          <TodoView />
        </nav>
        <section>
          <TodoForm />
          <TodoList />
        </section>
      </main>
    </div>
  )
}

export default HomePage