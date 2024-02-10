import React from 'react'
import { Link } from 'react-router-dom';
import './ContinueProject.css'
import ProGuy from "../../assets/ProGuy__.jpg"

function ContinueProject(props) {
  return (
    // <div className='con-boss'>
        <form className='Project_Overlay'>
         
         <div className='Project_Overlay_Upper_Part'>
   
          <div className='Project_Overlay_Top2'>
             
             <img src={ProGuy} className='Project_Overlay_img'></img>
   
             <div className='Project_Overlay_img_right'>
                <div className='Project_Overlay_Name'>ProjectName</div>
                <input className='Project_Overlay_Project_Name' placeholder='Enter Project Name'></input>
             </div>
             
          </div>
   
          <div className='Project_Overlay_Mid_Input'>
   
             <div className='Project_Overlay_Categories'>
               <div className='Project_Overlay_Category_Name'>Category</div>
               <input className='Project_Overlay_Category' placeholder='Website Development,UI Design'></input>
             </div>
   
             <div className='Project_Overlay_Categories'>
               <div className='Project_Overlay_Category_Name'>Tools</div>
               <input className='Project_Overlay_Category' placeholder='Website Development,UI Design'></input>
             </div>
   
          </div>
   
          <div className='Project_Overlay_Project_Status'>
   
             <div className='Project_Overlay_Project_Status_Name'>Project Status</div>
                     
             <div className='Radio'>
             <label className='Radio_Input'>
                <input type='radio' id="option1" name="options" value="option1" checked></input>
                <span className='Project_Status_Text'>Ongoing</span>
             </label>
   
             <label className='Radio_Input' >
                <input type='radio' id="option2" name="options" value="option2"></input>
                <span className='Project_Status_Text'>Completed</span>
             </label>

             {/* <div class="radio-container">
  <input type="radio" id="option1" name="options" value="option1" checked>
  <label for="option1">Option 1</label>
</div>

<div class="radio-container">
  <input type="radio" id="option2" name="options" value="option2">
  <label for="option2">Option 2</label>
</div> */}
   
           
           </div>   
   
   
          </div>
   
          <div className='Project_Overlay_Bottom'>
           <button className='Project_Overlay_Cancel' onClick={props.close}>Cancel</button>
           {/* <button className='Project_Overlay_Draft'>Save Draft</button> */}
           <Link to="/profile" className='Project_Overlay_Publish'>Publish Project</Link>
          </div>
   
         </div>
   
       </form>

    // </div>
  )
}

export default ContinueProject