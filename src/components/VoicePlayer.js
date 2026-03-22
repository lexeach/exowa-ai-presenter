import { useEffect } from "react";
import { speakText, preloadSpeech } from "../services/sarvamVoiceService";
import { slides } from "../slides/slidesData";

function VoicePlayer({ text, slideIndex, onStart, onFinish }) {

useEffect(()=>{

const play = async()=>{

if(!text) return;

if(onStart) onStart();

await speakText(text, slideIndex);

if(onFinish) onFinish();

/* PRELOAD NEXT SLIDE */

const next = slideIndex + 1;

if(slides[next]){

preloadSpeech(next, slides[next].voice);

}

};

play();

},[text]);

return null;

}

export default VoicePlayer;