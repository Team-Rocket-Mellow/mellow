import SignUp from "../components/Auth/SignUp"
import SignIn from "../components/Auth/SignIn"
import TopMenu from "../components/TopMenu/TopMenu"

// —————————————————————————————————————————————————————————————————————————————
// Page

function Auth() {
  return (
    <div id="SignIn">
      <TopMenu />
      <SignIn />
      <SignUp />
    </div>
  )
}

// —————————————————————————————————————————————————————————————————————————————
// Export

export default Auth