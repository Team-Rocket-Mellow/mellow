import TopMenu  from "../components/TopMenu/TopMenu"
import LeftMenu from "../components/LeftMenu/LeftMenu"
import TodoView from "../components/TodoView/TodoView"
import AddTodo  from "../components/AddTodo/AddTodo"
import Command  from "../components/Command/Command"
import SearchView from "../components/Search/SearchView"
import { useHotKey } from "../state/hooks"
import { Routes, Route } from 'react-router-dom'

// —————————————————————————————————————————————————————————————————————————————
// Component

function Home() {
  useHotKey()
  return <>
    <div id="Home">
      <TopMenu />
      <div className="flex">
        {/* <LeftMenu /> */}
        {/* <TodoView /> */}
      </div>
    </div>
    {/* @ts-ignore */}
    <AddTodo />
    {/* @ts-ignore */}
    <Command />
  <Routes>
    <Route path="/search/:query" element={<SearchView />} />
  </Routes>
  </>
}

// —————————————————————————————————————————————————————————————————————————————
// Export

export default Home