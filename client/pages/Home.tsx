import TodoForm from "../components/dashboard/TodoForm"
import TodoList from "../components/dashboard/TodoList"
import TodoView from "../components/dashboard/TodoView"
import TopMenu from "../components/TopMenu/TopMenu"
import Modal from "../components/modal/Modal"

function HomePage() {
  return (
    <div id="HomePage">
      <TopMenu />
      <main>
        <nav>
          <TodoView />
        </nav>
        <section>
          <Modal />
          {/* <TodoForm /> */}
          <TodoList />
        </section>
      </main>
    </div>
  )
}

export default HomePage