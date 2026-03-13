import { useEffect } from "react";
import { speakText } from "../services/sarvamVoiceService";

function VoicePlayer({ text, onStart, onFinish }) {

useEffect(()=>{

const speak = async () => {

if(!text) return;

if(onStart) onStart();

await speakText(text);

if(onFinish) onFinish();

};

speak();

},[text]);

return null;

}

export default VoicePlayer;