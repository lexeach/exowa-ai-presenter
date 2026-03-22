import React from "react";

function SlideViewer({ slide }) {

return (

<div
style={{
width:"100%",
height:"100%",
display:"flex",
alignItems:"center",
justifyContent:"center"
}}
>

<img
src={slide.image}
alt=""
style={{
maxWidth:"100%",
maxHeight:"100%",
objectFit:"contain"
}}
/>

</div>

);

}

export default SlideViewer;