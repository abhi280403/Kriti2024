// // SidebarProfile.js

import React, { useState } from "react";
import "./Infobar.css"; // Make sure to include your CSS file
import mapIcon from "../../assets/map-icon.png"
import NotFriend from "../../assets/make-friend.png"
import isFriend from "../../assets/is-friend.png"
import Notification from "./Notification";
import AVATAR from "../../assets/Avatar.jpg"

const NotifyPage = ({ onClose }) => {
  return (
    <div className='notify-overlay'>
      <div className="notify">
        <div className="cross-btn" onClick={onClose}>X</div>
        <Notification
          close= {onClose}
        />
      </div>
    </div>
  );
};

const Infobar = () => {
  // State to track which accordion section is open
  const [openSection, setOpenSection] = useState("discover");

  const toggleSection = (section) => {
    if (openSection === section) {
      // setOpenSection(null);
    } else {
      setOpenSection(section);
    }
  };

  const [friend, setFriend] = useState(false);

  function madeFriend(){
    setFriend((prevState) =>!prevState)
  }

  const [isNotifyOpen, setIsNotifyOpen] = useState(false);

  // Function to toggle the visibility of the pop-up page
  const toggleNotify = () => {
    
      setIsNotifyOpen(!isNotifyOpen);
  };

  return (
    <div className="infobar">
      <div className="info-section">
        <button
          className="accordion"
          onClick={() => toggleSection("notification")}
        >
          Notification
        </button>
        <div
          className={`panel ${
            openSection === "notification" ? "open" : "instant-close"
          }`}
        >
          <div className="info-content">
            {/* Profile Bio Here */}
            <img src={AVATAR} className="info-image"/>
            <div className="info-info" onClick={toggleNotify}>
              <div >Message from Rishi Kiran</div>
              <p>Do you know how to use figma</p>
            </div>
          </div>
          <div className="info-content">
            {/* Profile Bio Here */}
            <img src={AVATAR} className="info-image" />
            <div className="info-info" onClick={toggleNotify}>
              <div>Message from Rishi Kiran</div>
              <p>Do you know how to use figma</p>
            </div>
          </div>
        </div>
      </div>

      <div className="info-section">
        <button className="accordion" onClick={() => toggleSection("discover")}>
          Discover
        </button>
        <div
          className={`panel ${
            openSection === "discover" ? "open" : "instant-close"
          }`}
        >
          {/* Expertise Content Here */}
          <div className="info-content">
          <img src={AVATAR} className="info-image" />
            <div className="info-info">
              <div>Rishi Kiran</div>
              <p><img src={mapIcon} alt="Map Icon" /> IIT Guwahati</p>
            </div>
            <div className="info-select" onClick={madeFriend}>
              <img
                src={friend ? isFriend : NotFriend}
                alt="request friend"
              />
            </div>
          </div>
          <div className="info-content">
          <img src={AVATAR} className="info-image" />
            <div className="info-info">
              <div>Rishi Kiran</div>
              <p><img src={mapIcon} alt="Map Icon" /> IIT Guwahati</p>
            </div>
            <div className="info-select" onClick={madeFriend}>
              <img
                src={friend ? isFriend : NotFriend}
                alt="request friend"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="info-section fixed-bottom">
        <button className="accordion">
        {/* <button className="accordion" onClick={() => toggleSection("club")}> */}
          Club
        </button>
        <div
          className= "panel open"
          // className={`panel ${
          //   openSection === "club" ? "open" : "instant-close"
          // }`}
        >
          {/* Courses Content Here */}
          <div class="info-content">
          <img src={AVATAR} className="info-image" />
            <div class="info-info">
              <div>Coding Club, IITG</div>
              <p>17 project • 32 courses</p>
            </div>
          </div>
        </div>
      </div>
      {/* Render the pop-up page conditionally */}
      {isNotifyOpen && <NotifyPage onClose={toggleNotify} />}
    </div>
  );
};

export default Infobar;
