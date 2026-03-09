import { useEffect } from "react";
import { speakText } from "../services/elevenLabsService";

function VoicePlayer({ text, onStart, onFinish }) {

useEffect(() => {

const speak = async () => {

if (!text) return;

if (onStart) onStart();

await speakText(text);

if (onFinish) onFinish();

};

speak();

}, [text]);   // text change hone par speech run hoga

return null;

}

export default VoicePlayer;