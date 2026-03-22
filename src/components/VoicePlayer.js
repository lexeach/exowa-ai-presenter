import { useEffect } from "react";
import { speakText, preloadSpeech } from "../services/sarvamVoiceService";
import { slides } from "../slides/slidesData";

function VoicePlayer({ text, slideIndex, onStart, onFinish }) {

useEffect(() => {

const playVoice = async () => {

if (!text) return;

try {

/* preload next slide */

const next = slideIndex + 1;

if (slides[next] && slides[next].voice) {
preloadSpeech(next, slides[next].voice);
}

/* wait for slide to render */

await new Promise(resolve => setTimeout(resolve, 300));

/* avatar start */

if (onStart) onStart();

/* play voice */

await speakText(text, slideIndex);

/* finish callback */

if (onFinish) onFinish();

} catch (err) {

console.error("VoicePlayer error:", err);

}

};

playVoice();

}, [slideIndex]);

return null;
}

export default VoicePlayer;