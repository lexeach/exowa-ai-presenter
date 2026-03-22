import { useEffect } from "react";
import { speakText, preloadSpeech } from "../services/sarvamVoiceService";
import { slides } from "../slides/slidesData";

function VoicePlayer({ text, slideIndex, onStart, onFinish }) {

useEffect(() => {

const playVoice = async () => {

if (!text) return;

try{

/* 🔥 FORCE PRELOAD CURRENT IF NOT READY */

await preloadSpeech(slideIndex, text);

/* START */

if(onStart) onStart();

/* PLAY FROM CACHE ONLY */

await speakText(text, slideIndex);

/* NEXT SLIDE PRELOAD */

const next = slideIndex + 1;

if(slides[next]){
preloadSpeech(next, slides[next].voice);
}

/* FINISH */

if(onFinish) onFinish();

}catch(e){

console.error(e);

}

};

playVoice();

}, [text, slideIndex]);

return null;

}

export default VoicePlayer;