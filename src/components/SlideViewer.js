import React from "react";

function SlideViewer({slide}){

return(

<div style={{
border:"1px solid #ccc",
padding:"20px",
marginTop:"20px",
minHeight:"150px"
}}>

<h2>{slide.title}</h2>

<p>{slide.content}</p>

</div>

);

}

export default SlideViewer;