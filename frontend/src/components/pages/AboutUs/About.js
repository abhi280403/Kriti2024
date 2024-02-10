import React from "react"
import { useEffect,useRef } from "react";
import { Link } from "react-router-dom";
import './About.css';
import abtwow from "../../assets/abt-wow.png";
import abtimg1 from "../../assets/abt-img1.png";
import abtimg21 from "../../assets/image10.png";
import abtimg3 from "../../assets/abt-img3.png";

const About =()=>{

    // Use the useRef hook to create a reference to the animated div
    const animatedDivRef = useRef(null);
  
    // Use the useEffect hook to set up the Intersection Observer
    useEffect(() => {
      const options = {
        threshold: 0.5, // Trigger when 50% of the element is visible
      };
  
      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
          }
        });
      }, options);
  
      if (animatedDivRef.current) {
        observer.observe(animatedDivRef.current);
      }
  
      // Clean up the observer on component unmount
      return () => {
        observer.disconnect();
      };
    }, []);
    
        return (
          <div className="About-boss">
            {/* NAVBAR  */}
            <nav className="Navbar-abt">
              <div className="About-logo">CampusCollaborator</div>
              <Link to="/Login" className="querie">Login</Link>
              <Link to="/Login" className="course">Signup with Outlook</Link>
            </nav>

            {/* MAIN CONTENT  */}
            <div className="about-main">
              <div className="welcome">
                <div className="well-content">
                  <div className="well-text">
                    <div className="well-header">
                    Create and Collaborate with students across the country.
                    </div>
                    <div className="well-write">
                    CampusCollaborate provides a platform for students to post and collaborate with other students on projects.
                    </div>
                  </div>
                  <div className="well-btn">
                    <Link to="/Login" className="sign-up">Sign Up with Outlook</Link>
                    <Link to ="/Login" className="log">Login</Link>
                  </div>
                </div>

                <div className="well-img">
                  <img className="wow" src={abtwow}></img>
                </div>

              </div>
            </div>

            {/* MORE INFO  */}
            <div className="more" >
              <div className="more-boxes">
                <div className="more-content">
                  CONTENT
                  <div className="more-para">
                    <p>Unleash Your Creativity: share, showcase, and inspire with our seamless project upload feature</p>
                    <p>Upload and update your projects and maintain a professional portfolio on CampusCollaborate</p>
                  </div>
                </div>
                <div className="more-img">
                  <img src={abtimg1}></img>
                </div>
              </div>
              <div className="more-boxes">
                <div className="more-content">
                  COLLABORATE
                  <div className="more-para">
                    <p>Foster Collaboration, Ignite Innovation: Connect with peers, collaborate on projects, and Amplify your learning experience</p>
                    <p>Share ideas, split tasks, and achieve more together. Our feature makes collaboration easy, so you can ace your projects</p>

                  </div>
                </div>
                <div className="more-img2">
                  <img src={abtimg21}></img>
                  <div className="more-frame">
                    <div className="more-div1">Open to Collab</div>
                    <div className="more-div2">Send Request</div>
                  </div>
                </div>

              </div>
              <div className="more-boxes">
                <div className="more-content">
                  CONNECT
                  <div className="more-para">
                    <p>Elevate Your Learning Community: Share knowledge, solve doubts, and discover new courses together</p>
                    <p>Upload and update your projects and maintain a professional portfolio on CampusCollaborate</p>

                  </div>
                  
                </div>
                <div className="more-img3">
                  <img src={abtimg3}></img>
                </div>

              </div>
            </div>

            {/* PLZ LOGIN  */}
            {/* <div className="abt-login">
              <Link to ="/Login" className="bottom-log1">Sign Up with Outlook</Link>
              <Link to ="/Login" className="bottom-log2">Login</Link>
            </div> */}

            {/* <script src="https://unpkg.com/aos@next/dist/aos.js"></script>
            <script>
              AOS.init();
            </script> */}
            
          </div>
        );
      
}
export default About;