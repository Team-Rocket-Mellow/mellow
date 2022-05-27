import "./App.css"
import { RecoilRoot, } from "recoil"
import Home from "./pages/Home"

// —————————————————————————————————————————————————————————————————————————————
// Component

function App() {
  return <div id="App">
    <RecoilRoot>
      <Home />
    </RecoilRoot>
  </div>
}

// —————————————————————————————————————————————————————————————————————————————
// Export

export default App