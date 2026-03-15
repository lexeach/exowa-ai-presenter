import React, { useState, useRef } from "react";
import { askAI } from "../services/openaiService";
import { speakText } from "../services/sarvamVoiceService";

function ChatBox({ setSpeaking }) {

const [listening, setListening] = useState(false);
const [conversation, setConversation] = useState(false);

const recognitionRef = useRef(null);

const startRecognition = () => {

const SpeechRecognition =
window.SpeechRecognition || window.webkitSpeechRecognition;

if (!SpeechRecognition) {
alert("Speech recognition not supported in this browser");
return;
}

const recognition = new SpeechRecognition();

recognition.lang = "hi-IN";
recognition.continuous = false;
recognition.interimResults = false;

recognitionRef.current = recognition;

recognition.start();
setListening(true);

recognition.onresult = async (event) => {

const question = event.results[0][0].transcript;

console.log("Parent:", question);

setListening(false);

try {

const answer = await askAI(question);

console.log("AI:", answer);

setSpeaking(true);

await speakText(answer);

setSpeaking(false);

} catch (err) {
console.error("AI error:", err);
}

};

/* IMPORTANT */
recognition.onend = () => {

setListening(false);

/* restart mic in conversation mode */

if (conversation) {
setTimeout(() => {
startRecognition();
}, 500);
}

};

recognition.onerror = (e) => {

console.error("Speech error:", e);

setListening(false);

};

};


/* Start conversation */

const startConversation = () => {

setConversation(true);
startRecognition();

};


/* Stop conversation */

const stopConversation = () => {

setConversation(false);

if (recognitionRef.current) {
recognitionRef.current.stop();
}

setListening(false);

};


return (

<div style={{
marginTop: "40px",
padding: "20px",
border: "1px solid #ddd",
borderRadius: "10px",
maxWidth: "700px"
}}>

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
🎤 Listening...
</p>
)}

</div>

);

}

export default ChatBox;