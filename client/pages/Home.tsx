import TodoList from "../components/TodoList/TodoList"
import TodoView from "../components/TodoView/TodoView"
import TopMenu  from "../components/TopMenu/TopMenu"
import Modal    from "../components/Modal/Modal"

// —————————————————————————————————————————————————————————————————————————————
// Component

function Home() {
  return (
    <div id="Home">
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

export default Home