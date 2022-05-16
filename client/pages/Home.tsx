import TodoForm from "../components/dashboard/TodoForm"
import TodoList from "../components/dashboard/TodoList"
import TodoView from "../components/dashboard/TodoView"
import TopMenu from "../components/TopMenu/TopMenu"

function HomePage() {
  return (
    <div id="HomePage">
      <TopMenu />
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