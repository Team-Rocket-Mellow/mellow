import SignUp from "../components/login/SignUp"
import SignIn from "../components/login/SignIn"
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