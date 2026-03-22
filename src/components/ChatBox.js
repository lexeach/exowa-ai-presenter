import React, { useState, useRef, useEffect } from "react";
import { askAI } from "../services/openaiService";
import { speakText } from "../services/sarvamVoiceService";

function ChatBox({ setSpeaking, autoStart }) {

const [conversation, setConversation] = useState(false);
const [listening, setListening] = useState(false);

const recognitionRef = useRef(null);
const historyRef = useRef([]);
const conversationRef = useRef(false);
const aiSpeakingRef = useRef(false);


/* AUTO START CONVERSATION */

useEffect(()=>{

if(autoStart){

setTimeout(()=>{
startConversation();
},500);

}

},[autoStart]);


/* START SPEECH RECOGNITION */

const startRecognition = () => {

const SpeechRecognition =
window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();

recognition.lang = "hi-IN";
recognition.continuous = false;
recognition.interimResults = false;
recognition.maxAlternatives = 1;

recognitionRef.current = recognition;

setListening(true);

recognition.start();


/* USER SPEAKS */

recognition.onresult = async (event) => {

const question = event.results[0][0].transcript;

console.log("Parent:", question);

setListening(false);

historyRef.current.push({
role: "user",
content: question
});

try {

/* STOP MIC BEFORE AI SPEAKS */

if(recognitionRef.current){
recognitionRef.current.stop();
}

/* GET AI ANSWER */

const answer = await askAI(question, historyRef.current);

console.log("AI:", answer);

historyRef.current.push({
role: "assistant",
content: answer
});

/* AI SPEAKING LOCK */

aiSpeakingRef.current = true;

setSpeaking(true);

/* SMALL DELAY */

await new Promise(resolve => setTimeout(resolve,200));

/* PLAY VOICE */

await speakText(answer);

setSpeaking(false);

aiSpeakingRef.current = false;

} catch (error) {

console.error("AI error:", error);

}


/* RESTART MIC */

if (conversationRef.current) {

setTimeout(() => {

startRecognition();

}, 1200);

}

};


/* MIC TIMEOUT */

recognition.onend = () => {

if (conversationRef.current && !aiSpeakingRef.current) {

setTimeout(() => {

startRecognition();

}, 1000);

}

};


/* ERROR HANDLING */

recognition.onerror = (event) => {

if (event.error === "no-speech") return;
if (event.error === "aborted") return;

console.log("Speech error:", event);

};

};


/* START CONVERSATION */

const startConversation = () => {

conversationRef.current = true;

setConversation(true);

startRecognition();

};


/* STOP CONVERSATION */

const stopConversation = () => {

conversationRef.current = false;

setConversation(false);

if (recognitionRef.current) {

recognitionRef.current.stop();

}

setListening(false);

};


return (

<div
style={{
marginTop: "40px",
padding: "20px",
border: "1px solid #ddd",
borderRadius: "10px",
maxWidth: "700px"
}}
>

<h3>Parent Voice Interaction</h3>

{!conversation && (

<button
onClick={startConversation}
style={{
padding: "12px",
background: "#27AE60",
color: "#fff",
border: "none",
borderRadius: "6px"
}}
>
🎤 Start Conversation
</button>

)}

{conversation && (

<button
onClick={stopConversation}
style={{
padding: "12px",
background: "#E74C3C",
color: "#fff",
border: "none",
borderRadius: "6px"
}}
>
Stop Conversation
</button>

)}

{listening && (

<p style={{ marginTop: "10px", color: "#E74C3C" }}>
🎤 बोलिए... मैं सुन रहा हूँ
</p>

)}

</div>

);

}

export default ChatBox;