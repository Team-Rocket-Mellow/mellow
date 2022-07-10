import TopMenu  from "../components/TopMenu/TopMenu"
import LeftMenu from "../components/LeftMenu/LeftMenu"
import TodoView from "../components/TodoView/TodoView"
import AddTodo  from "../components/AddTodo/AddTodo"
import Command  from "../components/Command/Command"
import Settings from "../components/Settings/Settings"
import { useHotKey } from "../state/hooks"

// —————————————————————————————————————————————————————————————————————————————
// Component

function Home() {
  useHotKey()
  return <>
    <div id="Home">
      <TopMenu />
      <div className="flex">
        <LeftMenu />
        <TodoView />
      </div>
    </div>
    {/* @ts-ignore */}
    <AddTodo />
    {/* @ts-ignore */}
    <Command />
    {/* @ts-ignore */}
    <Settings />
  </>
}

// —————————————————————————————————————————————————————————————————————————————
// Export

export default Home