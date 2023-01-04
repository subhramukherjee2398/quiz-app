import React from 'react'
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
  return (
    <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'70vh'}}>
     <div className='home-container'>
        <div><h1 style={{color:'white',fontSize:'2rem'}}>Quiz App</h1></div>
        <div>
            <button className='button-36' onClick={()=> navigate("/quiz-board")}>Play</button>
        </div>
    </div>
    </div>
  )
}

export default Home