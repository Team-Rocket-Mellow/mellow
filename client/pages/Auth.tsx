import SignUp from "../components/login/SignUp"
import SignIn from "../components/login/SignIn"
import NavBar from "../components/navbar/NavBar"

// —————————————————————————————————————————————————————————————————————————————
// Page

function Auth() {
  return (
    <div id="SignIn">
      <NavBar />
      <SignIn />
      <SignUp />
    </div>
  )
}

// —————————————————————————————————————————————————————————————————————————————
// Export

export default Auth