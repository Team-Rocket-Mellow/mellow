import SignUp from "../components/login/SignUp"
import SignIn from "../components/login/SignIn"
import Navbar from "../components/navbar/Navbar"

// —————————————————————————————————————————————————————————————————————————————
// Page

function Auth() {
  return (
    <div id="SignIn">
      <Navbar />
      <SignIn />
      <SignUp />
    </div>
  )
}

// —————————————————————————————————————————————————————————————————————————————
// Export

export default Auth