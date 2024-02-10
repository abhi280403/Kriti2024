import React, { useState } from "react";
import './HomeFeed.css'
import Infobar from "./Infobar";
import DOLO from "../../assets/Project_img.png"
import DOLO2 from "../../assets/Project_img2.png.jpg"
import DOLO3 from "../../assets/Project_img3.webp"

const HomeFeed = () => {

  const [isopen1, setisopen1] = useState(true);
  const [isopen2, setisopen2] = useState(false);
  const [isopen3, setisopen3] = useState(false);

  const clicked1 = (section) => {
    if (isopen1 === section) {
      // setOpenSection(null);
    } else {
      setisopen1(section);
      setisopen2(false);
      setisopen3(false);
    }
  };

  const clicked2 = (section) => {
    if (isopen2 === section) {
      // setOpenSection(null);
    } else {
      setisopen2(section);
      setisopen1(false);
      setisopen3(false);
    }
  };

  const clicked3 = (section) => {
    if (isopen3 === section) {
      // setOpenSection(null);
    } else {
      setisopen3(section);
      setisopen2(false);
      setisopen1(false);
    }
  };

  return (
    <div className="HomeFeed">
        <div className="biggest-container">
            {/* <div className="container-1"> */}
              {/* <nav className='Upper_part'>
              <a href="#" className='gugu item-container-1'>
                <div
                    className={`${
                      isopen1 === true ? "yesopen" : "notopen"
                    }`}

                    onClick={() => clicked1(true)}
                >Relevant</div>
              </a>
              <a href="#" className='gugu item-container-1'>
                <div
                    className={`${
                      isopen2 === true ? "yesopen" : "notopen"
                    }`}

                    onClick={() => clicked2(true)}
                >Latest</div>
              </a>
              <a href="#" className='gugu item-container-1'>
                <div
                   className={`${
                    isopen3 === true ? "yesopen" : "notopen"
                  }`}

                  onClick={() => clicked3(true)}
                >Following</div>
              </a>

              <div class="animation start-home"></div>
              </nav> */}
              {/* <div className="item-container-1  filter">
                 <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M7.50002 15V9.75L2.21252 3H15.7875L10.5 9.75V15H7.50002Z" fill="#929292"/>
                 </svg>
                  <div className="gaga">Filter</div>
              </div> */}
            {/* </div> */}
            {/* <hr className="bar"></hr> */}
            

            <div className="biggest-box">

              <div className="Home_img">
              <img src={DOLO} className="box"></img>
              <div className="content_of_box">Spotify Clone</div>
              </div>
              
              <div className="Home_img">
              <img src={DOLO2} className="box"></img>
              <div className="content_of_box">Chess Vs Connect4</div>
              </div>

              <div className="Home_img">
              <img src={DOLO3} className="box"></img>
              <div className="content_of_box">Windows Assistant</div>
              </div>

              <div className="Home_img">
              <img src={DOLO2} className="box"></img>
              <div className="content_of_box">Alcheringa Website</div>
              </div>

              <div className="Home_img">
              <img src={DOLO3} className="box"></img>
              <div className="content_of_box">Shashwat BKL</div>
              </div>

              <div className="Home_img">
              <img src={DOLO} className="box"></img>
              <div className="content_of_box">Jatin Pro</div>
              </div>

              <div className="Home_img">
              <img src={DOLO} className="box"></img>
              <div className="content_of_box">Jatin Pro</div>
              </div>

              <div className="Home_img">
              <img src={DOLO2} className="box"></img>
              <div className="content_of_box">Vibhanshu Chakka</div>
              </div>

              <div className="Home_img">
              <img src={DOLO3} className="box"></img>
              <div className="content_of_box">Veenas ki Mkc</div>
              </div>
            </div>
        </div>
        <Infobar/>
    </div>
  )
}

export default HomeFeed



// import React, { useState } from "react";
// import Infobar from './Infobar'
// import './HomeFeed.css'

// const HomeFeed = () => {

//   const [isopen1, setisopen1] = useState(true);
//   const [isopen2, setisopen2] = useState(false);
//   const [isopen3, setisopen3] = useState(false);

//   const clicked1 = (section) => {
//     if (isopen1 === section) {
//       // setOpenSection(null);
//     } else {
//       setisopen1(section);
//       setisopen2(false);
//       setisopen3(false);
//     }
//   };

//   const clicked2 = (section) => {
//     if (isopen2 === section) {
//       // setOpenSection(null);
//     } else {
//       setisopen2(section);
//       setisopen1(false);
//       setisopen3(false);
//     }
//   };

//   const clicked3 = (section) => {
//     if (isopen3 === section) {
//       // setOpenSection(null);
//     } else {
//       setisopen3(section);
//       setisopen2(false);
//       setisopen1(false);
//     }
//   };

//   return (
//     <div className="HomeFeed">
//         <div className="biggest-container">
//             <div className="container-1">
//               <nav className='Upper_part'>
//               <a href="#" className='gugu item-container-1'>
//                 <div
//                     className={`${
//                       isopen1 === true ? "yesopen" : "notopen"
//                     }`}

//                     onClick={() => clicked1(true)}
//                 >Relevant</div>
//               </a>
//               <a href="#" className='gugu item-container-1'>
//                 <div
//                     className={`${
//                       isopen2 === true ? "yesopen" : "notopen"
//                     }`}

//                     onClick={() => clicked2(true)}
//                 >Latest</div>
//               </a>
//               <a href="#" className='gugu item-container-1'>
//                 <div
//                    className={`${
//                     isopen3 === true ? "yesopen" : "notopen"
//                   }`}

//                   onClick={() => clicked3(true)}
//                 >Following</div>
//               </a>

//               <div class="animation start-home"></div>
//               </nav>
//               <div className="item-container-1  filter">
//                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
//                     <path d="M7.50002 15V9.75L2.21252 3H15.7875L10.5 9.75V15H7.50002Z" fill="#929292"/>
//                  </svg>
//                   <div className="gaga">Filter</div>
//               </div>
//             </div>
//             {/* <hr className="bar"></hr> */}
            

//             <div className="biggest-box">

//               <div>
//               <div className="box"></div>
//               <div className="content_of_box">Spotify Clone</div>
//               </div>
              
//               <div>
//               <div className="box"></div>
//               <div className="content_of_box">Chess Vs Connect4</div>
//               </div>

//               <div>
//               <div className="box"></div>
//               <div className="content_of_box">Windows Assistant</div>
//               </div>

//               <div>
//               <div className="box"></div>
//               <div className="content_of_box">Alcheringa Website</div>
//               </div>

//               <div>
//               <div className="box"></div>
//               <div className="content_of_box">Shashwat BKL</div>
//               </div>

//               <div>
//               <div className="box"></div>
//               <div className="content_of_box">Jatin Pro</div>
//               </div>

//               <div>
//               <div className="box"></div>
//               <div className="content_of_box">Jatin Pro</div>
//               </div>

//               <div>
//               <div className="box"></div>
//               <div className="content_of_box">Vibhanshu Chakka</div>
//               </div>

//               <div>
//               <div className="box"></div>
//               <div className="content_of_box">Veenas ki Mkc</div>
//               </div>
//             </div>
//         </div>
//         <Infobar className="Infobar"/>
//     </div>
//   )
// }

// export default HomeFeed