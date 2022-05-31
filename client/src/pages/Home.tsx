import TopMenu  from "../components/TopMenu/TopMenu"
import LeftMenu from "../components/LeftMenu/LeftMenu"
import TodoView from "../components/TodoView/TodoView"
import Modal    from "../components/Modal/Modal"

// —————————————————————————————————————————————————————————————————————————————
// Component

function Home() {
  return <>
    <div id="Home">
      <TopMenu />
      <div className="flex">
        <LeftMenu />
        <TodoView />
      </div>
    </div>
    {/* @ts-ignore */}
    <Modal />
  </>
}

// —————————————————————————————————————————————————————————————————————————————
// Export

export default Home