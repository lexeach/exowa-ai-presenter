import React, { useState, useEffect } from "react";

function AvatarPresenter({ speaking }) {

const [mouthOpen,setMouthOpen] = useState(false);

useEffect(()=>{

let interval;

if(speaking){

interval = setInterval(()=>{

setMouthOpen(prev=>!prev);

},200);

}

return ()=>clearInterval(interval);

},[speaking]);

return (

<div style={{textAlign:"center"}}>

<img
src="/avatar/ai-teacher.png"
alt="AI Presenter"
style={{
width:"200px",
borderRadius:"10px",
transform: mouthOpen ? "scaleY(1.02)" : "scaleY(1)"
}}
/>

<p style={{fontWeight:"bold"}}>
AI Presenter
</p>

</div>

);

}

export default AvatarPresenter;