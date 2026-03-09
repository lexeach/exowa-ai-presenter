import React, { useState } from "react";
import Avatar from "./components/Avatar";
import SlideViewer from "./components/SlideViewer";
import ChatBox from "./components/ChatBox";
import VoicePlayer from "./components/VoicePlayer";
import { slides } from "./slides/slidesData";

function App() {

  const [currentSlide, setCurrentSlide] = useState(0);

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
    <div style={{fontFamily:"Arial", padding:"20px"}}>

      <h1>EXOWA AI Presenter</h1>

      <Avatar />

      <SlideViewer slide={slides[currentSlide]} />

      <VoicePlayer text={slides[currentSlide].content} />

      <div style={{marginTop:"20px"}}>
        <button onClick={prevSlide}>Previous</button>
        <button onClick={nextSlide} style={{marginLeft:"10px"}}>Next</button>
      </div>

      <ChatBox />

    </div>
  );
}

export default App;