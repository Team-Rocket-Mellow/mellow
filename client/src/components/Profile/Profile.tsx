import "./Profile.css"
import { useState, useEffect, useRef } from "react"
import { useRecoilState, useRecoilValue } from "recoil"
// import { profile_is_active } from "../../state/atoms"
import Icon from "../assets/Icon"

function Profile() {

  return (
    <div id="profile-container">
      <div className="user-container">
        <Icon className="profile-icon">account_circle</Icon>
          <div className="username-container">
            <div className="profile-name">Billybob123</div>
            <div className="email-profile">@username123@gmail.com</div>
          </div>
      </div>

      <div className="first-container">
        <div className="notifications-contents">
          <Icon>notifications</Icon>
          <div className="notifications">Notifications</div>
        </div>

        <div className="integrations-contents">
          <Icon>library_add</Icon>
          <div className="integrations">Integrations</div>
        </div>

        <div className="activity-contents">
          <Icon>monitoring</Icon>
          <div className="activity">Activity log</div>
        </div>
      </div>


      <div className="second-container">
        <div className="privacy-contents">
          <Icon>health_and_safety</Icon>
          <div className="privacy">Privacy</div>
        </div>

        <div className="billing-contents">
          <Icon>monetization_on</Icon>
          <div className="billing">Billing</div>
        </div>
      </div>

      <div className="logout-container">
        <div className="logout-contents">
          <Icon>logout</Icon>
          <div className="logout-profile">Log out</div>
        </div>
      </div>

    </div>
  )
}

export default Profile