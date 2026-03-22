import React, { useState } from "react";
import { unlockAudio } from "./services/sarvamVoiceService";
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
fontFamily: "Arial",
padding: "20px",
maxWidth: "900px",
margin: "auto"
}}
>

<h1 style={{ textAlign: "center" }}>
EXOWA AI Presenter
</h1>

{/* Avatar */}
<AvatarPresenter speaking={speaking} />

{/* Slide */}
<SlideViewer slide={slides[currentSlide]} />

{/* Slide narration */}
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

/* Next slide */

setCurrentSlide(prev => {

if(prev < slides.length - 1){
return prev + 1;
}

return prev;

});

}}
/>

)}

{/* Q&A Intro Voice */}
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

{/* Controls */}
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
{qaMode && (
<ChatBox setSpeaking={setSpeaking} autoStart={true} />
)}
)}

</div>

);

}

export default App;