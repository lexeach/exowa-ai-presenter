import React from "react";

function SlideViewer({ slide }){

return(

<div
style={{
width:"100%",
height:"80vh",
display:"flex",
justifyContent:"center",
alignItems:"center"
}}
>

<img
src={slide.image}
alt={slide.title}
style={{
width:"100%",
height:"100%",
objectFit:"contain"
}}
/>

</div>

);

}

export default SlideViewer;