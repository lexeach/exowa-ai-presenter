import React, { useState, useEffect, useRef } from "react";
import { unlockAudio, preloadSpeech } from "./services/sarvamVoiceService";
import SlideViewer from "./components/SlideViewer";
import ChatBox from "./components/ChatBox";
import VoicePlayer from "./components/VoicePlayer";
import AvatarPresenter from "./components/AvatarPresenter";
import { slides } from "./slides/slidesData";

function App() {

const [currentSlide, setCurrentSlide] = useState(0);
const [speaking, setSpeaking] = useState(false);
const [started, setStarted] = useState(false);

const [qaMode, setQaMode] = useState(false);
const [qaIntroDone, setQaIntroDone] = useState(false);

const containerRef = useRef(null);


/* preload first 2 slides */

useEffect(()=>{

if(started){

preloadSpeech(0, slides[0]?.voice);
preloadSpeech(1, slides[1]?.voice);

}

},[started]);


/* FULLSCREEN FUNCTION */

const toggleFullscreen = () => {

if(!document.fullscreenElement){

containerRef.current.requestFullscreen();

}else{

document.exitFullscreen();

}

};


/* NEXT SLIDE */

const nextSlide = () => {

setCurrentSlide(prev => {

if(prev < slides.length - 1){
return prev + 1;
}

return prev;

});

};


/* PREVIOUS SLIDE */

const prevSlide = () => {

setCurrentSlide(prev => {

if(prev > 0){
return prev - 1;
}

return prev;

});

};


return (

<div
ref={containerRef}
style={{
fontFamily:"Arial",
width:"100%",
height:"100%",
display:"flex",
flexDirection:"column",
alignItems:"center",
justifyContent:"flex-start"
}}
>

<h1 style={{textAlign:"center"}}>
EXOWA AI Presenter
</h1>


{/* Avatar */}

<AvatarPresenter speaking={speaking} />


{/* Slide */}

<SlideViewer slide={slides[currentSlide]} />


{/* Slide narration */}

{started && !qaMode && (

<VoicePlayer
key={"slide-"+currentSlide}
text={slides[currentSlide]?.voice}
slideIndex={currentSlide}
onStart={()=>setSpeaking(true)}
onFinish={()=>{

setSpeaking(false);

/* slide 20 → start Q&A */

if(currentSlide === 19){

setQaMode(true);
return;

}

/* next slide */

setCurrentSlide(prev => {

if(prev < slides.length - 1){
return prev + 1;
}

return prev;

});

}}
/>

)}


{/* Q&A intro voice */}

{qaMode && !qaIntroDone && (

<VoicePlayer
key="qa-intro"
text="अगर आपका कोई सवाल है तो आप पूछ सकते हैं।"
slideIndex={999}
onStart={()=>setSpeaking(true)}
onFinish={()=>{

setSpeaking(false);
setQaIntroDone(true);

}}
/>

)}


{/* CONTROLS */}

<div
style={{
marginTop:"20px",
display:"flex",
justifyContent:"center",
gap:"10px",
flexWrap:"wrap"
}}
>

<button onClick={prevSlide}>
Previous
</button>

<button onClick={nextSlide}>
Next
</button>


<button onClick={toggleFullscreen}>
Fullscreen
</button>


{!started && (

<button
onClick={()=>{

unlockAudio();
setStarted(true);

}}
style={{
background:"#2F80ED",
color:"#fff",
border:"none",
padding:"10px 16px",
borderRadius:"6px"
}}
>

Start Presentation

</button>

)}

</div>


{/* Q&A */}

{qaMode && qaIntroDone && (

<ChatBox setSpeaking={setSpeaking} autoStart={true} />

)}

</div>

);

}

export default App;