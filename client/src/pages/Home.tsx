import TopMenu  from "../components/TopMenu/TopMenu"
import LeftMenu from "../components/LeftMenu/LeftMenu"
import TodoView from "../components/TodoView/TodoView"
import Modal    from "../components/Modal/Modal"
import Command  from "../components/Command/Command"

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
    {/* @ts-ignore */}
    <Command />
  </>
}

// —————————————————————————————————————————————————————————————————————————————
// Export

export default Home