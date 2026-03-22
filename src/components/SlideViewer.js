import React from "react";

function SlideViewer({ slide }){

return(

<div
style={{
width: "100vw",
height: "100vh",
display: "flex",
justifyContent: "center",
alignItems: "center",
background: "#000"
}}
>

<img
src={slide.image}
alt={slide.title}
style={{
maxWidth: "100%",
maxHeight: "100%",
objectFit: "contain"
}}
/>

</div>

);

}

export default SlideViewer;