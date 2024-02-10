import React, { useState,useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import './Sidebar.css'
import {Avatar} from "flowbite-react"
import Side_arrow from "../../assets/side-arrow.png"
import Graduation_hat from "../../assets/graduation-hat.png"
import School_Pic from "../../assets/school-pic.png"
import diamond from "../../assets/diamond.png";


function Sidebar({m_strUser}) {

  const[profiles,setProfiles]=useState([]);
  useEffect(() => {
    const username=JSON.parse(localStorage.getItem('msalAccount'))["username"]
    axios.get(`http://localhost:8080/getprofile?userid=${username}`)
      .then(Profile => {
        setProfiles(Profile.data);
      })
      .catch(err => console.log(err));
  }, [m_strUser]);
  

  console.log(profiles);

  
  const [activeSection, setActiveSection] = useState("profile");

  const handleSectionToggle = (section) => {
    setActiveSection(activeSection === section ? section : section);
  };
  return (
    <div className="app">
      <div className="profile-nav">
        <div
          className={
            activeSection === "profile"
              ? "view-profile-open"
              : "view-profile-close"
          }
        >
          <button
            className="profile-btn"
            onClick={() => handleSectionToggle("profile")}
          >
            <img src={Side_arrow} className="Sidarrow"></img>Profile 
          </button>

          {activeSection === "profile" && (
            <div className="profile-details">
              <div className="profile-head">
                {/* <img src=""></img> */}
                <Avatar img="https://img.freepik.com/free-vector/mysterious-mafia-man-smoking-cigarette_52683-34828.jpg?w=1380&t=st=1707489879~exp=1707490479~hmac=c74fc2653ab4232a6cddd0e5c8e4c2f230951067ad7fed99b78ab008e200a07a" alt="avatar of Jese" rounded />
                <div className="profile-name">
                  <p className="p1">{profiles.map(profile => profile.name)}</p>
                  
                </div>
              </div>
              <div className="profile-origin">

                <div className="profile-know">
                  <p className="p3">Web Development</p>
                  <p className="p4">UI Design</p>
                </div>

                <div className="education">
                  <div><img src={Graduation_hat}></img> <p>{profiles.map(profile => profile.branch)}</p></div>
                  <div> <img src={School_Pic}></img><p>I{profiles.map(profile => profile.institute)}</p></div>
                </div>
                
              </div>

              <button className="line"></button>

              {/* <div className="profile-content">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</div> */}
            </div>

          )}
        </div>

        <div
          className={
            activeSection === "expertise"
              ? "view-expertise-open"
              : "view-expertise-close"
          }
        >
          <button
            className="profile-btn"
            onClick={() => handleSectionToggle("expertise")}
          >
            <img src={Side_arrow} className="Sidarrow"></img>Expertise{" "}
            {/* {activeSection === "expertise" ? "▲" : "▼"} */}
          </button>
          {activeSection === "expertise" && (
            <div className="expertise-details">
              <button className="line"></button>
              {/* <ul>
                <li>Backend Dev</li>
                <li>UI Design</li>
                <li>Frontend Dev</li>
                <li>Product Management</li>
                <li>Aero-modelling</li>
                <li>Web Development</li>
              </ul> */}
              <div className="data1"><img src={diamond}></img>Backend Dev <img src={Side_arrow}></img></div>
              <div className="data1"><img src={diamond}></img>UI Design<img src={Side_arrow}></img></div>
              <div className="data1"><img src={diamond}></img>Frontend Dev<img src={Side_arrow}></img></div>
              <div className="data1"><img src={diamond}></img>Product Managemen<img src={Side_arrow}></img></div>
              <div className="data1"><img src={diamond}></img>Aero-modelling<img src={Side_arrow}></img></div>
              <div className="data1"><img src={diamond}></img>Web Development<img src={Side_arrow}></img></div>
            </div>
          )}
        </div>
        <div className="view-profile-close">
          <Link to="/courses" className="profile-btn">
            {" "}
            <img src=""></img> Courses
          </Link>
        </div>
        {/* <div className="view-profile-close">
          <button className="profile-btn">
            {" "}
            <img src=""></img>Get In Touch
          </button>
        </div> */}
      </div>
      <div>
        <button className="edit-profile-btn">Edit Profile</button>
        <button className="edit-profile-btn">Logout</button>
      </div>
    </div>
  );
}

export default Sidebar;