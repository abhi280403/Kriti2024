import React, { useState, useEffect } from "react";
import Infobar from "./Infobar";
import "./HomeFeed.css";

const HomeFeed = () => {
  const [isopen1, setisopen1] = useState(true);
  const [isopen2, setisopen2] = useState(false);
  const [isopen3, setisopen3] = useState(false);
  const [projects, setProjects] = useState([]);

  const clicked1 = () => {
    setisopen1(true);
    setisopen2(false);
    setisopen3(false);
  };

  const clicked2 = () => {
    setisopen1(false);
    setisopen2(true);
    setisopen3(false);
  };

  const clicked3 = () => {
    setisopen1(false);
    setisopen2(false);
    setisopen3(true);
  };

  const fetchProjectDetails = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/showProject");
      if (response.ok) {
        const data = await response.json();
        // Reverse the array and take the first 10 elements
        setProjects(data.data.reverse().slice(0, 10));
      } else {
        throw new Error("Failed to fetch project details");
      }
    } catch (error) {
      console.error("Error fetching project details:", error);
    }
  };

  useEffect(() => {
    // Fetch project details when the component mounts
    fetchProjectDetails();
  }, []);

  return (
    <div className="HomeFeed">
      <div className="biggest-container">
        <div className="boxcontainer">
          <div className="biggest-box">
            {projects.map((project) => (
              <div key={project.projectId} className="project-box">
                <img
                  // src={project.image}
                  src="http://localhost:8080/uploads\\e43003a39645372b0db1e55a4d6e55d1"
                  alt="Project"
                  className="project-image"
                  style={{ width: '100%' }}
                />

                <div className="project-details" id={`${project.projectId}`}>
                  <h3 id={`${project.projectId}`}>{project.projectId}</h3>

                  {project.inputFields &&
                    project.inputFields.map((field, index) =>
                      field.type === 'heading' ? <p key={index}>{field.value}</p> : null
                    )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
          <Infobar />
    </div>
  );
};

export default HomeFeed;