import TodoList from "../components/TodoList/TodoList"
import LeftMenu from "../components/LeftMenu/LeftMenu"
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
          <LeftMenu />
        </nav>
        <section id="TodoView">
          <TodoList />
        </section>
      </main>
      <Modal />
    </div>
  )
}

// —————————————————————————————————————————————————————————————————————————————
// Export

export default Home