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

const [isMobileFull, setIsMobileFull] = useState(false);

const containerRef = useRef(null);


/* FIX MOBILE VIEWPORT HEIGHT */

useEffect(() => {

const setMobileHeight = () => {
const vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty("--vh", `${vh}px`);
};

setMobileHeight();
window.addEventListener("resize", setMobileHeight);

return () => window.removeEventListener("resize", setMobileHeight);

}, []);


/* PRELOAD FIRST 2 SLIDES */

useEffect(() => {

if (started) {
preloadSpeech(0, slides[0]?.voice);
preloadSpeech(1, slides[1]?.voice);
}

}, [started]);


/* FULLSCREEN TOGGLE */

const toggleFullscreen = () => {

if (window.innerWidth < 768) {

/* MOBILE FULLSCREEN */

setIsMobileFull(!isMobileFull);

} else {

/* DESKTOP FULLSCREEN */

if (!document.fullscreenElement) {
containerRef.current.requestFullscreen();
} else {
document.exitFullscreen();
}

}

};


/* NEXT SLIDE */

const nextSlide = () => {

setCurrentSlide(prev => {

if (prev < slides.length - 1) {
return prev + 1;
}

return prev;

});

};


/* PREVIOUS SLIDE */

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
ref={containerRef}
style={{
fontFamily: "Arial",
width: isMobileFull ? "100vw" : "100%",
height: isMobileFull ? "calc(var(--vh, 1vh) * 100)" : "auto",
position: isMobileFull ? "fixed" : "relative",
top: 0,
left: 0,
background: "#000",
zIndex: isMobileFull ? 9999 : "auto",
display: "flex",
flexDirection: "column",
alignItems: "center",
justifyContent: "center"
}}
>

{/* AVATAR */}

<AvatarPresenter speaking={speaking} />


{/* SLIDE */}

<SlideViewer slide={slides[currentSlide]} />


{/* VOICE PLAYER */}

{started && !qaMode && (

<VoicePlayer
key={"slide-" + currentSlide}
text={slides[currentSlide]?.voice}
slideIndex={currentSlide}
onStart={() => setSpeaking(true)}
onFinish={() => {

setSpeaking(false);

/* START Q&A AFTER SLIDE 20 */

if (currentSlide === 19) {
setQaMode(true);
return;
}

/* NEXT SLIDE */

setCurrentSlide(prev => {

if (prev < slides.length - 1) {
return prev + 1;
}

return prev;

});

}}
/>

)}


{/* Q&A INTRO VOICE */}

{qaMode && !qaIntroDone && (

<VoicePlayer
key="qa-intro"
text="अगर आपका कोई सवाल है तो आप पूछ सकते हैं।"
slideIndex={999}
onStart={() => setSpeaking(true)}
onFinish={() => {

setSpeaking(false);
setQaIntroDone(true);

}}
/>

)}


{/* CONTROLS */}

{!isMobileFull && !document.fullscreenElement && (

<div
style={{
marginTop: "20px",
display: "flex",
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
Fullscreen
</button>

{!started && (

<button
onClick={() => {

unlockAudio();
setStarted(true);

}}
style={{
background: "#2F80ED",
color: "#fff",
border: "none",
padding: "10px 16px",
borderRadius: "6px"
}}
>

Start Presentation

</button>

)}

</div>

)}


{/* Q&A CHAT */}

{qaMode && qaIntroDone && (

<ChatBox
setSpeaking={setSpeaking}
autoStart={window.innerWidth > 768}
/>

)}

</div>

);

}

export default App;