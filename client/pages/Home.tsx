import TodoList from "../components/dashboard/TodoList"
import TodoView from "../components/dashboard/TodoView"
import TopMenu from "../components/TopMenu/TopMenu"
import Modal from "../components/modal/Modal"

// —————————————————————————————————————————————————————————————————————————————
// Component

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
          <TodoList />
        </section>
      </main>
    </div>
  )
}

// —————————————————————————————————————————————————————————————————————————————
// Export

export default HomePage