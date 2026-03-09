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
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <div style={{ fontFamily: "Arial", padding: "20px" }}>

      <h1>EXOWA AI Presenter</h1>

      {/* AI Avatar */}
      <AvatarPresenter speaking={speaking} />

      {/* Slide */}
      <SlideViewer slide={slides[currentSlide]} />

      {/* Voice narration */}
      <VoicePlayer
key={currentSlide}
text={slides[currentSlide].voice}
onStart={() => setSpeaking(true)}
onFinish={() => {

setSpeaking(false);

setCurrentSlide(prev => prev + 1) {

if (prev < slides.length - 1) {
return prev + 1;
}

return prev;

});

}}
/>

      {/* Slide Controls */}
      <div style={{ marginTop: "20px" }}>
        <button onClick={prevSlide}>Previous</button>
        <button onClick={nextSlide} style={{ marginLeft: "10px" }}>
          Next
        </button>
      </div>

      {/* AI Chat */}
<ChatBox setSpeaking={setSpeaking} />

    </div>
  );
}

export default App;