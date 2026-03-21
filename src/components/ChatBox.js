import React, { useState, useRef, useEffect } from "react";
import { askAI } from "../services/openaiService";
import { speakText } from "../services/sarvamVoiceService";

function ChatBox({ setSpeaking }) {

const [conversation,setConversation] = useState(false);
const [listening,setListening] = useState(false);

const recognitionRef = useRef(null);
const speakingRef = useRef(false);
const historyRef = useRef([]);

useEffect(()=>{

const SpeechRecognition =
window.SpeechRecognition || window.webkitSpeechRecognition;

if(!SpeechRecognition){
alert("Speech recognition not supported");
return;
}

const recognition = new SpeechRecognition();

recognition.lang = "hi-IN";
recognition.continuous = true;
recognition.interimResults = false;
recognition.maxAlternatives = 1;

recognitionRef.current = recognition;

/* speech detected */

recognition.onresult = async (event)=>{

if(speakingRef.current) return;

const question = event.results[event.results.length-1][0].transcript;

console.log("Parent:",question);

historyRef.current.push({
role:"user",
content:question
});

try{

const answer = await askAI(question,historyRef.current);

console.log("AI:",answer);

historyRef.current.push({
role:"assistant",
content:answer
});

speakingRef.current = true;

setSpeaking(true);

await speakText(answer);

setSpeaking(false);

speakingRef.current = false;

}catch(err){

console.error(err);

}

};

/* ignore normal errors */

recognition.onerror = (event)=>{

if(event.error === "no-speech") return;
if(event.error === "aborted") return;

console.log("Speech error:",event);

};

/* restart recognition if needed */

recognition.onend = ()=>{

if(conversation){

try{
recognition.start();
}catch(e){}

}

};

},[conversation,setSpeaking]);


/* start */

const startConversation = ()=>{

setConversation(true);

try{
recognitionRef.current.start();
setListening(true);
}catch(e){}

};

/* stop */

const stopConversation = ()=>{

setConversation(false);

try{
recognitionRef.current.stop();
}catch(e){}

setListening(false);

};

return(

<div style={{
marginTop:"40px",
padding:"20px",
border:"1px solid #ddd",
borderRadius:"10px",
maxWidth:"700px"
}}>

<h3>Parent Voice Interaction</h3>

{!conversation && (

<button
onClick={startConversation}
style={{
padding:"12px",
background:"#27AE60",
color:"#fff",
border:"none",
borderRadius:"6px"
}}
>
🎤 Start Conversation
</button>

)}

{conversation && (

<button
onClick={stopConversation}
style={{
padding:"12px",
background:"#E74C3C",
color:"#fff",
border:"none",
borderRadius:"6px"
}}
>
Stop Conversation
</button>

)}

{listening && (

<p style={{marginTop:"10px",color:"#E74C3C"}}>
🎤 बोलिए... मैं सुन रहा हूँ
</p>

)}

</div>

);

}

export default ChatBox;