import React from "react";

function SlideViewer({ slide }) {

return (

<div
style={{
display:"flex",
justifyContent:"center",
alignItems:"center",
width:"100%",
height:"80vh",
overflow:"hidden"
}}
>

<img
src={slide.image}
alt="slide"
style={{
maxWidth:"100%",
maxHeight:"100%",
objectFit:"contain",
display:"block",
margin:"0 auto"
}}
/>

</div>

);

}

export default SlideViewer;