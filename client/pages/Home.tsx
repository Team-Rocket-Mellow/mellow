import TodoList from "../components/TodoList/TodoList"
import LeftMenu from "../components/LeftMenu/LeftMenu"
import TopMenu  from "../components/TopMenu/TopMenu"
import Modal    from "../components/Modal/NewModal"

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