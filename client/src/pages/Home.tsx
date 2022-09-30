import TopMenu    from "../components/TopMenu/TopMenu"
import LeftMenu   from "../components/LeftMenu/LeftMenu"
import TodoView   from "../components/TodoView/TodoView"
import AddTodo    from "../components/AddTodo/AddTodo"
import Command    from "../components/Command/Command"
import SearchView from "../components/Search/SearchView"
import Settings   from "../components/Settings/Settings"

import { useHotKey } from "../state/hooks"
import { Routes, Route } from 'react-router-dom'
import { useRecoilValue } from "recoil"
import { theme } from "../state/atoms"
import { useEffect } from "react"

// —————————————————————————————————————————————————————————————————————————————
// Component

function Home() {
  const lightOrDark = useRecoilValue(theme)
  const Δtheme = (light=true) => {
    const theme = light ? "light" : "dark"
    localStorage.setItem("theme", theme)
    document.documentElement.setAttribute("data-theme", theme)
  }

  useHotKey()
  useEffect(() => Δtheme(lightOrDark === "light"), [lightOrDark])

  return <>
    <div id="Home">
      <TopMenu />
      <div className="flex">
        <LeftMenu />
      <Routes>
        <Route path="/" element={<TodoView />} />
        <Route path="/inbox" element={<TodoView />} />
        <Route path="/all" element={<TodoView />} />
        <Route path="/today" element={<TodoView />} />
        <Route path="/upcoming" element={<TodoView />} />
        <Route path="/done" element={<TodoView />} />
        <Route path="/trash" element={<TodoView />} />
        <Route path="/search/:query" element={<SearchView />} />
      </Routes>
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