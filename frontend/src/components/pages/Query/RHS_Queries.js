import React,{useState,useEffect} from 'react'
import './RHS_Queries.css'
import axios from 'axios'
import AVATAR_2 from "../../assets/Avatar_2.png"

function RHS_Queries(props) {

  const [ShowCourses_Queries,setShowCourses_Queries]=useState(true)
  const [ShowMyCourses_Queries,setShowMyCourses_Queries]=useState(true)

  const AddCourseClicked_Queries = () => {
      setShowCourses_Queries(!ShowCourses_Queries)
  }

  const [myQueries,setMyQueries] = useState([])

  useEffect(() => {
    let isMounted = true;
    async function fetchMyQueries() {
      const resp = await axios.post('http://localhost:8080/api/myQueryPosts',{userEmail : JSON.parse(localStorage.getItem('msalAccount'))['username'] });
      console.log(resp.data);
      if(isMounted){
        resp.data.forEach(element => {
          setMyQueries(myQueries => [...myQueries,element])
          console.log(element);
        });
      }
      
    }
    fetchMyQueries();


    console.log("FIRE :: ",myQueries);
    return () => {
      isMounted = false;
    };
  },[])

  return (
    <div className='RHS_Queries'>
        <div className='RHS_Queries-Biggest-Container'>

          <div className='RHS_Queries-Add-Courses' onClick={props.ShowOrNotAnswer_Queries}>
                 <div className='RHS_Queries-Add-Courses-Ask-Question'>Ask Question</div>
                 <button className='RHS_Queries-Add-Courses-Ask-Question-Add-Button'
                   
                 >
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                        <path d="M13.75 16.25H6.25V13.75H13.75V6.25H16.25V13.75H23.75V16.25H16.25V23.75H13.75V16.25Z" fill="black"/>
                    </svg>
                 </button>
          </div>

          
          {
            ShowMyCourses_Queries ? (
              
  
              <div className='RHS_Queries-My-Courses'>

             <div className='RHS_Queries-My-Courses-Upper-Part'>

                <button className='RHS_Queries-Add-Courses-My-Courses-Arrow'>
                   <svg xmlns="http://www.w3.org/2000/svg" width="14" height="30" viewBox="0 0 14 30" fill="none">
                      <path d="M2 27L12 16L2 6" stroke="#656565"/>
                   </svg>
                </button>

                <div className='RHS_Queries-My-Courses-Text'>My Queries</div>

                <div className='RHS_Queries-My-Courses-Text-View-All'>View All</div>

             </div>

             <div className='RHS_Queries-My-Courses-Content'>

             {myQueries.map(elm => 
                <div className='RHS_Queries-My-Courses-Content-Main'>  
                <div className='RHS_Queries-My-Courses-Content-Text'>  {elm.question} </div>  
                <div className='RHS_Queries-My-Courses-Content-Text-Below-Part'>    
                <div className='RHS_Queries-My-Courses-Content-Text-Below-Part-LHS'>    
                <div className='RHS_Queries-My-Courses-Content-Text-Below-Part-Circle-Img'>       
                {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"> < circle cx="12" cy="12" r="12" fill="#D9D9D9"/> </svg>  */}
                <img src={AVATAR_2} className='AVATAR_2'></img>
                </div> 
                <div className='RHS_Queries-My-Courses-Content-Text-Below-Part-Club-Name'>  {JSON.parse(localStorage.getItem('msalAccount'))['name']} </div> 
                </div>    
                <div className='RHS_Queries-My-Courses-Content-Text-Below-Part-Date'> {new Date(elm.createdAt).toLocaleString()} </div> </div></div>
              )}

             </div>
             
          </div>


            ) : null
          }


        </div>
    </div>
  )
}

export default RHS_Queries