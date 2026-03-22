import { useEffect } from "react";
import { speakText, preloadSpeech } from "../services/sarvamVoiceService";
import { slides } from "../slides/slidesData";

function VoicePlayer({ text, slideIndex, onStart, onFinish }) {

useEffect(() => {

const playVoice = async () => {

if (!text) return;

try {

/* NEXT SLIDE PRELOAD FIRST */

const nextSlide = slideIndex + 1;

if (slides[nextSlide] && slides[nextSlide].voice) {
preloadSpeech(nextSlide, slides[nextSlide].voice);
}

/* START SPEAKING */

if (onStart) onStart();

/* PLAY CURRENT */

await speakText(text, slideIndex);

/* FINISH */

if (onFinish) onFinish();

} catch (e) {
console.error("VoicePlayer error:", e);
}

};

playVoice();

}, [slideIndex]);

return null;
}

export default VoicePlayer;