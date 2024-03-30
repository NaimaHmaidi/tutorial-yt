import React, { useState } from "react";


import AiwithText from "../components/AiwithText";
import AiwithImage from "../components/AiwithImage";

import ImageiIcon from "../assets/imagei_icon.png"


const Home = () => {
  const [aiWith , setLAiWith] = useState('text');
  const handleAiWith = (value)=> {
    setLAiWith(value);
  }
    return (
        <>
       
        <div >
        <img src={ImageiIcon} alt="" style={{ width: '30px', height: '30px', marginTop:'20px', marginLeft:'10px',cursor:'pointer' }}
            className={aiWith === 'image'?'aiWithActive':''}
            onClick={()=>handleAiWith('text')}/>
               Search Text
            <img src={ImageiIcon} alt="" style={{ width: '30px', height: '30px', marginTop:'20px', marginLeft:'10px', cursor:'pointer' }}
            className={aiWith === 'image'?'aiWithActive':''}
            onClick={()=>handleAiWith('image')}/>
               Search Image
        </div>
        
      {aiWith === 'text'?
      <AiwithText></AiwithText>
    : 
    
    <AiwithImage></AiwithImage>}
        </>
    );
};

export default Home;
