import React, { useState, useRef, useEffect } from "react";
import { askAI } from "../services/openaiService";
import { speakText } from "../services/sarvamVoiceService";

function ChatBox({ setSpeaking }) {

const [listening,setListening] = useState(false);
const [conversation,setConversation] = useState(false);

const recognitionRef = useRef(null);
const historyRef = useRef([]);
const conversationRef = useRef(false);
const speakingRef = useRef(false);

useEffect(()=>{

const SpeechRecognition =
window.SpeechRecognition || window.webkitSpeechRecognition;

if(!SpeechRecognition){
alert("Speech recognition not supported");
return;
}

const recognition = new SpeechRecognition();

recognition.lang = "hi-IN";
recognition.continuous = false;
recognition.interimResults = false;
recognition.maxAlternatives = 1;

recognitionRef.current = recognition;


/* USER SPEAKS */

recognition.onresult = async (event)=>{

const question = event.results[0][0].transcript;

console.log("Parent:",question);

setListening(false);

/* save question */

historyRef.current.push({
role:"user",
content:question
});

/* stop mic before speaking */

try{
recognition.abort();
}catch(e){}

try{

const answer = await askAI(question,historyRef.current);

console.log("AI:",answer);

historyRef.current.push({
role:"assistant",
content:answer
});

speakingRef.current = true;
setSpeaking(true);

/* speak AI response */

await speakText(answer);

speakingRef.current = false;
setSpeaking(false);

}catch(err){

console.error("AI error:",err);

}

/* restart mic after speaking */

if(conversationRef.current){

setListening(true);

setTimeout(()=>{

try{
recognitionRef.current.start();
}catch(e){}

},400);

}

};


/* ERROR HANDLING */

recognition.onerror = (event)=>{

if(event.error === "aborted"){
console.log("Speech aborted (normal)");
return;
}

if(event.error === "no-speech"){

console.log("No speech detected");

if(conversationRef.current && !speakingRef.current){

setTimeout(()=>{

try{
recognition.start();
setListening(true);
}catch(e){}

},1000);

}

return;

}

console.log("Speech error:",event);

};


/* recognition ended */

recognition.onend = ()=>{

if(conversationRef.current){

setTimeout(()=>{

try{
recognition.start();
setListening(true);
}catch(e){}

},600);

}

};

if(conversationRef.current && !speakingRef.current){

setTimeout(()=>{

try{
recognition.start();
setListening(true);
}catch(e){}

},1000);

}

};

},[setSpeaking]);


/* START CONVERSATION */

const startConversation = ()=>{

conversationRef.current = true;
setConversation(true);

try{
recognitionRef.current.start();
setListening(true);
}catch(e){}

};


/* STOP CONVERSATION */

const stopConversation = ()=>{

conversationRef.current = false;
setConversation(false);

try{
recognitionRef.current.stop();
}catch(e){}

setListening(false);

};


return(

<div
style={{
marginTop:"40px",
padding:"20px",
border:"1px solid #ddd",
borderRadius:"10px",
maxWidth:"700px"
}}
>

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
🎤 Listening...
</p>

)}

</div>

);

}

export default ChatBox;