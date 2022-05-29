import "./App.css"
import { RecoilRoot, } from "recoil"
import Home from "./pages/Home"

// —————————————————————————————————————————————————————————————————————————————
// Component

function App() {
  return <>
    <RecoilRoot>
      <Home />
    </RecoilRoot>
  </>
}

// —————————————————————————————————————————————————————————————————————————————
// Export

export default App