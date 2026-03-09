import { useEffect } from "react";
import { speakSlide } from "../services/browserVoiceService";

function VoicePlayer({ text, onStart, onFinish }) {

useEffect(() => {

const speak = async () => {

if (!text) return;

if (onStart) onStart();

await speakSlide(text);

if (onFinish) onFinish();

};

speak();

}, [text]);

return null;

}

export default VoicePlayer;