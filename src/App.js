import React, { useState } from "react";
import SlideViewer from "./components/SlideViewer";
import ChatBox from "./components/ChatBox";
import VoicePlayer from "./components/VoicePlayer";
import AvatarPresenter from "./components/AvatarPresenter";
import { slides } from "./slides/slidesData";

function App() {

const [currentSlide, setCurrentSlide] = useState(0);
const [speaking, setSpeaking] = useState(false);


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

<div style={{
fontFamily:"Arial",
padding:"20px",
maxWidth:"900px",
margin:"auto"
}}>

<h1 style={{textAlign:"center"}}>
EXOWA AI Presenter
</h1>


{/* AI Avatar */}
<AvatarPresenter speaking={speaking} />


{/* Slide */}
<SlideViewer slide={slides[currentSlide]} />


{/* Voice narration */}
<VoicePlayer
key={currentSlide}
text={slides[currentSlide]?.voice}
onStart={() => setSpeaking(true)}
onFinish={() => {

setSpeaking(false);

setCurrentSlide(prev => {

if (prev < slides.length - 1) {
return prev + 1;
}

return prev;

});

}}
/>


{/* Slide Controls */}

<div style={{
marginTop:"20px",
display:"flex",
justifyContent:"center",
gap:"10px"
}}>

<button onClick={prevSlide}>
Previous
</button>

<button onClick={nextSlide}>
Next
</button>

</div>


{/* AI Chat */}

<ChatBox setSpeaking={setSpeaking} />

</div>

);

}

export default App;