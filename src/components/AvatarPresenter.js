import React, { useState, useEffect } from "react";

function AvatarPresenter({ speaking }) {

const [mouth,setMouth] = useState(false);

useEffect(()=>{

let interval;

if(speaking){

interval = setInterval(()=>{
setMouth(prev => !prev);
},200);

}

return ()=>clearInterval(interval);

},[speaking]);

return(

<div style={{
textAlign:"center",
marginBottom:"20px"
}}>

<img
src="/avatar/ai-teacher.png"
alt="AI Presenter"
style={{
width:"180px",
borderRadius:"10px",
transition:"transform 0.1s",
transform: mouth ? "scaleY(1.03)" : "scaleY(1)"
}}
/>

<p style={{fontWeight:"bold"}}>
AI Presenter
</p>

</div>

);

}

export default AvatarPresenter;