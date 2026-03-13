import { useEffect, useRef } from "react";
import { speakText } from "../services/sarvamVoiceService";

function VoicePlayer({ text, onStart, onFinish }) {

const firstRun = useRef(true);

useEffect(()=>{

// prevent auto run on first load
if(firstRun.current){
firstRun.current = false;
return;
}

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