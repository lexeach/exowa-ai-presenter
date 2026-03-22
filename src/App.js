import React, { useState, useRef } from "react";
import { unlockAudio } from "./services/sarvamVoiceService";
import SlideViewer from "./components/SlideViewer";
import ChatBox from "./components/ChatBox";
import VoicePlayer from "./components/VoicePlayer";
import AvatarPresenter from "./components/AvatarPresenter";
import { slides } from "./slides/slidesData";
import { preloadSpeech } from "./services/sarvamVoiceService";

useEffect(() => {

if(started){

/* preload first 3 slides */

preloadSpeech(0, slides[0]?.voice);
preloadSpeech(1, slides[1]?.voice);
preloadSpeech(2, slides[2]?.voice);

}

}, [started]);

function App() {

const [currentSlide, setCurrentSlide] = useState(0);
const [speaking, setSpeaking] = useState(false);
const [started, setStarted] = useState(false);

const [qaMode, setQaMode] = useState(false);
const [qaIntroDone, setQaIntroDone] = useState(false);

const [isFullscreen, setIsFullscreen] = useState(false);

const slideContainerRef = useRef(null);


/* FULLSCREEN TOGGLE */

const toggleFullscreen = () => {

if(!document.fullscreenElement){

slideContainerRef.current.requestFullscreen();
setIsFullscreen(true);

}else{

document.exitFullscreen();
setIsFullscreen(false);

}

};


/* SLIDE CONTROLS */

const nextSlide = () => {

setCurrentSlide(prev => {

if (prev < slides.length - 1) {
return prev + 1;
}

return prev;

});

};

const prevSlide = () => {

setCurrentSlide(prev => {

if (prev > 0) {
return prev - 1;
}

return prev;

});

};


return (

<div
style={{
fontFamily:"Arial",
margin:"0",
padding:"0",
width:"100%",
height:"100%"
}}
>

<h1 style={{ textAlign: "center" }}>
EXOWA AI Presenter
</h1>


{/* PRESENTATION AREA */}

<div
ref={slideContainerRef}
style={{
width:"100vw",
height:"100vh",
background:"#000",
display:"flex",
justifyContent:"center",
alignItems:"center"
}}
>


{/* Slide */}

<SlideViewer slide={slides[currentSlide]} />


{/* Avatar (TED style corner) */}

<div
style={{
position:"absolute",
bottom:"20px",
right:"20px",
width:"180px"
}}
>

<AvatarPresenter speaking={speaking} />

</div>


</div>


{/* SLIDE NARRATION */}

{started && !qaMode && (

<VoicePlayer
key={"slide-" + currentSlide}
text={slides[currentSlide]?.voice}
onStart={() => setSpeaking(true)}
onFinish={() => {

setSpeaking(false);

/* Slide 20 finished */

if(currentSlide === 19){

setQaMode(true);

return;

}

setCurrentSlide(prev => {

if(prev < slides.length - 1){
return prev + 1;
}

return prev;

});

}}
/>

)}


{/* Q&A INTRO */}

{qaMode && !qaIntroDone && (

<VoicePlayer
key="qa-intro"
text="अगर आपका कोई सवाल है तो आप पूछ सकते हैं।"
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
marginTop: "20px",
display: "flex",
justifyContent: "center",
gap: "10px"
}}
>

<button onClick={prevSlide}>
Previous
</button>

<button onClick={nextSlide}>
Next
</button>

<button onClick={toggleFullscreen}>
{isFullscreen ? "Exit Full Screen" : "Full Screen"}
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


{/* Q&A CHAT */}

{qaMode && qaIntroDone && (
<ChatBox setSpeaking={setSpeaking} autoStart={true} />
)}

</div>

);

}

export default App;