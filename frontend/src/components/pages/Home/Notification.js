import React from 'react'
import "./Notification.css";
import mapicon from "../../assets/map-icon.png";
import AVATAR from "../../assets/Avatar.jpg"

function Notification(props) {
  return (
    <div className='noti-boss'>
         <div className='noti-name'>
            <div className='noti-noti'>
                <img src={AVATAR}></img>
                <div className='noti-info'>
                    Shashwat Sharma
                    <div className='noti-loc'>
                        <img src={mapicon}></img>
                        <p>IIT Guwahati</p>
                    </div>
                </div>
            </div>
            <div className='noti-div1'>Would like to collaborate with you on your project </div>
            <div className='noti-div2'>Chess vs Connect4</div>
         </div>
         <div className='noti-butn'>
            <div className='noti-accept'>Accept</div>
            <div className='noti-decline' >Decline</div>
         </div>

    </div>
  )
}

export default Notification