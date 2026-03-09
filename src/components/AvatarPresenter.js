import React, { useState, useEffect } from "react";

function AvatarPresenter({ speaking }) {

const [mouth,setMouth] = useState(false);

useEffect(()=>{

let interval;

if(speaking){

interval = setInterval(()=>{
setMouth(prev => !prev);
},120);

}

return ()=>clearInterval(interval);

},[speaking]);

return(

<div style={{
display:"flex",
flexDirection:"column",
alignItems:"center",
marginBottom:"20px"
}}>

<svg width="180" height="200" viewBox="0 0 200 220">

{/* Face */}
<circle cx="100" cy="100" r="70" fill="#FFD7B5" />

{/* Eyes */}
<circle cx="70" cy="80" r="8" fill="#000"/>
<circle cx="130" cy="80" r="8" fill="#000"/>

{/* Smile lines */}
<path d="M70 120 Q100 140 130 120" stroke="#000" strokeWidth="3" fill="none"/>

{/* Mouth animation */}
{mouth ? (

<ellipse cx="100" cy="120" rx="18" ry="10" fill="#000"/>

) : (

<ellipse cx="100" cy="120" rx="18" ry="4" fill="#000"/>

)}

{/* Body */}
<rect x="55" y="160" width="90" height="50" fill="#2F80ED" rx="10"/>

</svg>

<p style={{fontWeight:"bold",marginTop:"10px"}}>
AI Presenter
</p>

</div>

);

}

export default AvatarPresenter;