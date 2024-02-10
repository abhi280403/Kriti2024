import React, { useState, useEffect, useRef } from "react";
import Navbar from "../../header/Navbar";
import "./Project.css";
import axios from "axios";
import ContinueProject from "./ContinueProject";
import Review from "./Review";
const API_URI = "http://localhost:8080";

const PopupPage = ({ onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup">
        <ContinueProject close={onClose} />
      </div>
    </div>
  );
};

const Project = () => {
  const [projectId, setProjectId] = useState("");
  const [inputFields, setInputFields] = useState([]);
  const [file, setFile] = useState("");
  const [result, setResult] = useState([]);
  const fileInputRef = useRef();

  const uploadFile = async (data) => {
    try {
      const response = await axios.post(`${API_URI}/upload`, data);
      console.log("response is:", response);
      return response.data;
    } catch (error) {
      console.log("Error while calling the API ", error.message);
    }
  };

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);

        const response = await uploadFile(data);
        console.log(response.path);
        setResult((prev) => [...prev, response.path]);
      }
    };
    getImage();
  }, [file]);

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   setImage(file);
  // };

  const onUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    } else {
      console.error("fileInputRef.current is null or undefined");
    }
  };

  // PREVENT FORM LOSS ON RELOAD
  // const [inputFields, setInputFields] = useState([]);

  useEffect(() => {
    // Retrieve stored input fields from localStorage on component mount
    const storedInputFields =
      JSON.parse(localStorage.getItem("inputFields")) || [];
    setInputFields(storedInputFields);
  }, []);

  // useEffect(() => {
  //   const storedInputFields = JSON.parse(localStorage.getItem('inputFields'));
  //   if (storedInputFields) {
  //     setInputFields(storedInputFields);
  //   }
  // }, []);

  const addInputField = (type) => {
    if (type === "image") {
      onUploadClick();
    }
    const newInputField = { type, value: "" };
    setInputFields((prevFields) => [...prevFields, newInputField]);
  };

  useEffect(() => {
    localStorage.setItem("inputFields", JSON.stringify(inputFields));
  }, [inputFields]);

  const inputType = (field, index) => {
    const adjustHeight = (e) => {
      e.target.style.height = "inherit"; // Reset height to recalculate
      e.target.style.height = `${e.target.scrollHeight}px`; // Set new height
    };

    if (field.type === "heading" || field.type === "subheading") {
      return (
        <input
          type="text"
          className={`project-${field.type}`}
          placeholder={`Enter ${field.type} here`}
          value={field.value}
          onChange={(e) => handleInputChange(index, e.target.value)}
        />
      );
    } else if (field.type === "description" || field.type === "code-block") {
      return (
        <textarea
          className={`project-${field.type}`}
          placeholder={`Enter ${field.type} here`}
          value={field.value}
          onChange={(e) => handleInputChange(index, e.target.value)}
          onInput={adjustHeight}
        />
      );
    } else if (field.type === "image" || field.type === "pdf") {
      return (
        <input
          type="file"
          ref={fileInputRef}
          className={`project-${field.type}`}
          placeholder={`Add ${field.type === "image" ? "Image" : "PDF"}`}
          onChange={(e) => setFile(e.target.files[0])}
        />
      );
    }
  };

  const handleInputChange = (index, value) => {
    setInputFields((prevFields) => {
      const updatedFields = prevFields.map((f, i) =>
        i === index ? { ...f, value } : f
      );
      return updatedFields;
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append("projectId", projectId);
      // formData.append('image', result);
      result.forEach((path, index) => {
        formData.append("image[]", path);
      });

      inputFields.forEach((field, index) => {
        formData.append(`inputFields[${index}][type]`, field.type);
        formData.append(`inputFields[${index}][value]`, field.value);
      });
      console.log(formData);
      formData.append(
        "ownerEmail",
        JSON.parse(localStorage.getItem("msalAccount"))["username"]
      );
      formData.append(
        "ownerName",
        JSON.parse(localStorage.getItem("msalAccount"))["name"]
      );
      const response = await fetch("http://localhost:8080/api/saveProject", {
        method: "POST",
        body: formData,
      });

     



      if (!response.ok) {
        throw new Error("Failed to save project data");
      }

      localStorage.setItem("projectId", projectId);

      console.log("Project data saved successfully");
      setProjectId("");
      setInputFields([]);
      // You can handle success, for example, redirecting the user or showing a success message
    } catch (error) {
      console.error("Error saving project data:", error);
      // Handle the error, show an error message, etc.
    }
  };

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Function to toggle the visibility of the pop-up page
  const togglePopup = () => {
    if (projectId.trim() === "") {
      window.alert("Enter Project Id First!");
    } else {
      setIsPopupOpen(!isPopupOpen);
    }
  };

  // TO Rereash on clicking cancel
  const handleDiscardClick = () => {
    // Show confirmation dialog
    const isConfirmed = window.confirm(
      "Are you sure you want to discard your changes?"
    );

    // If the user confirmed, call the reset function
    if (isConfirmed) {
      resetToDefault();
    }
  };

  const resetToDefault = () => {
    // Reset inputFields state to its initial state
    setInputFields([]);

    // Clear the localStorage entry
    localStorage.removeItem("inputFields");
  };

  return (
    <div>
      <Navbar />
      <div className="project-main">
        <div className="content-shown">
          <form onSubmit={handleSubmit}>
            <div className="Id-div">
              <input
                type="text"
                className="project-projectId"
                placeholder="Enter Project ID (Compulsory)"
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
              />
            </div>
            {inputFields.map((field, index) => (
              <div key={index}>{inputType(field, index)}</div>
            ))}
            {/* <button type="submit" className="main-btn">
              Save Project
            </button> */}

            <div className="confirm-content">
              <button
                type="submit"
                className="continue-btn"
                onClick={togglePopup}
              >
                Continue
              </button>
              <button className="remove-btn" onClick={handleDiscardClick}>
                Discard
              </button>
            </div>
          </form>
        </div>

        <div className="add-box">
          <div className="add-content">
            Add Content
            <div className="add-btns">
              <button
                className="main-btn"
                onClick={() => addInputField("heading")}
              >
                Add Heading
              </button>
              <button
                className="main-btn"
                onClick={() => addInputField("subheading")}
              >
                Add Subheading
              </button>
              <button
                className="main-btn"
                onClick={() => addInputField("description")}
              >
                Add Description
              </button>
              <button
                className="main-btn"
                onClick={() => addInputField("image")}
              >
                Attach Image
              </button>
              <button className="main-btn" onClick={() => addInputField("pdf")}>
                Attach PDF
              </button>
              <button
                className="main-btn"
                onClick={() => addInputField("code-block")}
              >
                Code Block
              </button>
            </div>
          </div>

          {/* <div className="confirm-content">
            <button className="remove-btn">Discard</button>
            <button className="continue-btn">Continue</button>
          </div> */}
          {/* <div>result:{result}</div>
          <img src={result} alt="alt text"/> */}
        </div>
      </div>

      {/* Render the pop-up page conditionally */}
      {isPopupOpen && <PopupPage onClose={togglePopup} />}

      {/* <Review/> */}
    </div>
  );
};

export default Project;














// import React, { useState, useEffect, useRef } from 'react';
// import Navbar from '../../header/Navbar';
// import './Project.css';
// import axios from 'axios';
// const API_URI = 'http://localhost:8080';
// const PopupPage = ({ onClose }) => {
//   return (
//     <div className="popup">
//       <ContinueProject/>
//     </div>
//   );
// };

// const Project = () => {
//   const [projectId, setProjectId] = useState('');
//   const [inputFields, setInputFields] = useState([]);
//   const [file, setFile] = useState('');
//   const [result, setResult] = useState([]);
//   const fileInputRef = useRef();

//   const uploadFile = async (data) => {
//     try {
//         const response = await axios.post(`${API_URI}/upload`, data);
//         console.log("response is:",response)
//         return response.data;
//     } catch (error) {
//         console.log('Error while calling the API ', error.message);
//     }
//   }

//   useEffect(() => {
//     const getImage = async () => {
//       if (file) {
//         const data = new FormData();
//         data.append("name", file.name);
//         data.append("file", file);

//         const response = await uploadFile(data);
//         console.log(response.path)
//         setResult(prev => [...prev,response.path]);
//       }
//     }
//     getImage();
//   }, [file])

//   // const handleImageChange = (e) => {
//   //   const file = e.target.files[0];
//   //   setImage(file);
//   // };

//   const onUploadClick = () => {
//     if (fileInputRef.current) {
//       fileInputRef.current.click();
//     } else {
//       console.error("fileInputRef.current is null or undefined");
//     }
//   }

//   useEffect(() => {
//     const storedInputFields = JSON.parse(localStorage.getItem('inputFields'));
//     if (storedInputFields) {
//       setInputFields(storedInputFields);
//     }
//   }, []);

//   const addInputField = (type) => {
//     if(type === 'image'){
//       onUploadClick();
//     }
//     const newInputField = { type, value: '' };
//     setInputFields((prevFields) => [...prevFields, newInputField]);
//   };

//   useEffect(() => {
//     localStorage.setItem('inputFields', JSON.stringify(inputFields));
//   }, [inputFields]);

//   const inputType = (field, index) => {
//     const adjustHeight = (e) => {
//       e.target.style.height = 'inherit'; // Reset height to recalculate
//       e.target.style.height = `${e.target.scrollHeight}px`; // Set new height
//     };

//     if (field.type === 'heading' || field.type === 'subheading') {
//       return (
//         <input
//           type="text"
//           className={`project-${field.type}`}
//           placeholder={`Enter ${field.type} here`}
//           value={field.value}
//           onChange={(e) => handleInputChange(index, e.target.value)}
//         />
//       );
//     } else if (field.type === 'description' || field.type === 'caption' || field.type === 'code-block') {
//       return (
//         <textarea
//           className={`project-${field.type}`}
//           placeholder={`Enter ${field.type} here`}
//           value={field.value}
//           onChange={(e) => handleInputChange(index, e.target.value)}
//           onInput={adjustHeight}
//         />
//       );
//     } else if (field.type === 'image' || field.type === 'pdf') {
//       return (
//         <input
//           type="file"
//           ref={fileInputRef}
//           className={`project-${field.type}`}
//           placeholder={`Add ${field.type === 'image' ? 'Image' : 'PDF'}`}
//           onChange={(e) => setFile(e.target.files[0])}
//         />
//       );
//     }
//   };

//   const handleInputChange = (index, value) => {
//     setInputFields((prevFields) => {
//       const updatedFields = prevFields.map((f, i) =>
//         i === index ? { ...f, value } : f
//       );
//       return updatedFields;
//     });
//   };

  

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     try {
//       const formData = new FormData();
//       formData.append('projectId', projectId);
//       // formData.append('image', result);
//       result.forEach((path, index) => {
//         formData.append('image[]', path);
//       });

//       inputFields.forEach((field, index) => {
//         formData.append(`inputFields[${index}][type]`, field.type);
//         formData.append(`inputFields[${index}][value]`, field.value);
//       });
//       console.log(formData);
//       const response = await fetch('http://localhost:8080/api/saveProject', {
//         method: 'POST',
//         body: formData,
//       });

//       if (!response.ok) {
//         throw new Error('Failed to save project data');
//       }

//       console.log('Project data saved successfully');
//       setProjectId('');
//       setInputFields([]);
//       // You can handle success, for example, redirecting the user or showing a success message
//     } catch (error) {
//       console.error('Error saving project data:', error);
//       // Handle the error, show an error message, etc.
//     }
//   };

//   return (
//     <div>
//       <Navbar />
//       <div className="project-main">
//         <div className="content-shown">
//           <form onSubmit={handleSubmit}>
//             <div>
//               <input
//                 type="text"
//                 className="project-projectId"
//                 placeholder="Enter Project ID"
//                 value={projectId}
//                 onChange={(e) => setProjectId(e.target.value)}
//               />
//             </div>
//             {inputFields.map((field, index) => (
//               <div key={index}>{inputType(field, index)}</div>
//             ))}
//             {/* <button type="submit" className="main-btn">
//               Save Project
//             </button> */}
//             <button type = "submit" className="continue-btn">Continue</button>
//             <button className="remove-btn">Discard</button>
//           </form>
//         </div>

//         <div className="add-box">
//           <div className="add-content">
//             Add Content
//             <div className="add-btns">
//               <button className="main-btn" onClick={() => addInputField('heading')}>
//                 Add Heading
//               </button>
//               <button className="main-btn" onClick={() => addInputField('subheading')}>
//                 Add Subheading
//               </button>
//               <button className="main-btn" onClick={() => addInputField('description')}>
//                 Add Description
//               </button>
//               <button className="main-btn" onClick={() => addInputField('caption')}>
//                 Add Caption
//               </button>
//               <button className="main-btn" onClick={() => addInputField('image')} >
//                 Attach Image
//               </button>
//               {/* <button className="main-btn" onClick={() => addInputField('image')}>
//                 Attach Image
//               </button> */}
//               <button className="main-btn" onClick={() => addInputField('pdf')}>
//                 Attach PDF
//               </button>
//             </div>
//           </div>

//           {/* <div className="confirm-content">
//             <button className="remove-btn">Discard</button>
//             <button className="continue-btn">Continue</button>
//           </div> */}
//           {/* <div>result:{result}</div>
//           <img src={result} alt="alt text"/> */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Project;