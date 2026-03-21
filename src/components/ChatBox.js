import React, { useState, useRef, useEffect } from "react";
import { askAI } from "../services/openaiService";
import { speakText } from "../services/sarvamVoiceService";

function ChatBox({ setSpeaking }) {

const [listening, setListening] = useState(false);
const [conversation, setConversation] = useState(false);
const [history, setHistory] = useState([]);

const recognitionRef = useRef(null);

useEffect(() => {

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

/* USER SPEAKS */

recognition.onresult = async (event) => {

const question = event.results[0][0].transcript;

console.log("Parent:", question);

setListening(false);

/* add question to history */

const newHistory = [
...history,
{ role: "user", content: question }
];

try {

const answer = await askAI(question, newHistory);

console.log("AI:", answer);

/* save AI answer */

setHistory([
...newHistory,
{ role: "assistant", content: answer }
]);

setSpeaking(true);

await speakText(answer);

setSpeaking(false);

} catch (err) {

console.error("AI error:", err);

}

/* restart listening */

if (conversation) {

setTimeout(() => {

recognition.start();
setListening(true);

}, 800);

}

};

/* error handling */

recognition.onerror = (e) => {

console.log("Speech error:", e);

setListening(false);

};

/* when recognition stops */

recognition.onend = () => {

if (conversation) {

setTimeout(() => {

recognition.start();
setListening(true);

}, 800);

}

};

}, [conversation, history, setSpeaking]);

/* START CONVERSATION */

const startConversation = () => {

setConversation(true);

if (recognitionRef.current) {

recognitionRef.current.start();
setListening(true);

}

};

/* STOP CONVERSATION */

const stopConversation = () => {

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
🎤 Listening...
</p>

)}

</div>

);

}

export default ChatBox;