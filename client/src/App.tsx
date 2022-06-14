import "./App.css"
import { RecoilRoot, } from "recoil"
import { BrowserRouter } from 'react-router-dom'
import Home from "./pages/Home"

// —————————————————————————————————————————————————————————————————————————————
// Component

function App() {
  return (
    <BrowserRouter>
      <RecoilRoot>
        <Home />
      </RecoilRoot>
    </BrowserRouter>
  )
}

// —————————————————————————————————————————————————————————————————————————————
// Export

export default App