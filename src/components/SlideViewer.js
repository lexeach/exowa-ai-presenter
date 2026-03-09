import React from "react";

function SlideViewer({slide}){

return(

<div style={{
textAlign:"center",
marginTop:"20px"
}}>

<img
src={slide.image}
alt={slide.title}
style={{
width:"90%",
maxWidth:"900px",
borderRadius:"10px"
}}
/>

</div>

);

}

export default SlideViewer;