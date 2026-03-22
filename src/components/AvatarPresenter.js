import React from "react";

function AvatarPresenter({ speaking }) {

return (

<div
style={{
position:"fixed",
right:"20px",
bottom:"20px",
zIndex:9999,
transition:"all 0.3s ease"
}}
>

<div
style={{
width:"80px",
height:"80px",
borderRadius:"50%",
background:"#f2d1b3",
display:"flex",
alignItems:"center",
justifyContent:"center",
fontSize:"40px",
boxShadow:"0 4px 10px rgba(0,0,0,0.3)",
transform: speaking ? "scale(1.1)" : "scale(1)"
}}
>
🙂
</div>

</div>

);

}

export default AvatarPresenter;