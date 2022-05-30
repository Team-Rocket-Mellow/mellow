import "./Home.css"
import TodoList from "../components/TodoList/TodoList"
import LeftMenu from "../components/LeftMenu/LeftMenu"
import TopMenu  from "../components/TopMenu/TopMenu"
import Modal    from "../components/Modal/Modal"

// —————————————————————————————————————————————————————————————————————————————
// Component

function Home() {
  return <>
    <div id="Home">
      <TopMenu />
      <main>
        <LeftMenu />
        <section id="TodoView">
          <TodoList />
        </section>
      </main>
    </div>
    {/* @ts-ignore */}
    <Modal />
  </>
}

// —————————————————————————————————————————————————————————————————————————————
// Export

export default Home