import React, { useState, useEffect } from "react";
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


/* PRELOAD FIRST 3 SLIDES */

useEffect(() => {

if(started){

preloadSpeech(0, slides[0]?.voice);
preloadSpeech(1, slides[1]?.voice);

}

}, [started]);


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
style={{
fontFamily:"Arial",
padding:"20px",
maxWidth:"900px",
margin:"auto"
}}
>

<h1 style={{textAlign:"center"}}>
EXOWA AI Presenter
</h1>


{/* Avatar */}

<AvatarPresenter speaking={speaking} />


{/* Slide */}

<SlideViewer slide={slides[currentSlide]} />


{/* Slide Voice */}

{started && !qaMode && (

<VoicePlayer
key={"slide-"+currentSlide}
text={slides[currentSlide]?.voice}
slideIndex={currentSlide}
onStart={()=>setSpeaking(true)}
onFinish={()=>{

setSpeaking(false);

/* Slide 20 finished */

if(currentSlide === 19){

setQaMode(true);

return;

}

/* NEXT SLIDE */

setCurrentSlide(prev => {

if(prev < slides.length - 1){
return prev + 1;
}

return prev;

});

}}
/>

)}


{/* Q&A Intro */}

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


{/* Controls */}

<div
style={{
marginTop:"20px",
display:"flex",
justifyContent:"center",
gap:"10px"
}}
>

<button onClick={prevSlide}>
Previous
</button>

<button onClick={nextSlide}>
Next
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


{/* ChatBox */}

{qaMode && qaIntroDone && (

<ChatBox setSpeaking={setSpeaking} autoStart={true} />

)}

</div>

);

}

export default App;