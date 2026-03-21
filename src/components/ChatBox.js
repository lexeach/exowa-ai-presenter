import React, { useState, useRef, useEffect } from "react";
import { askAI } from "../services/openaiService";
import { speakText } from "../services/sarvamVoiceService";

function ChatBox({ setSpeaking }) {

const [conversation, setConversation] = useState(false);
const [listening, setListening] = useState(false);

const recognitionRef = useRef(null);
const historyRef = useRef([]);

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
recognition.maxAlternatives = 1;

recognitionRef.current = recognition;


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

/* stop mic before AI speaks */

try {
recognition.stop();
} catch (e) {}

const answer = await askAI(question, historyRef.current);

console.log("AI:", answer);

historyRef.current.push({
role: "assistant",
content: answer
});

/* speak AI answer */

setSpeaking(true);

await speakText(answer);

setSpeaking(false);

} catch (error) {

console.error("AI error:", error);

}

/* restart mic */

if (conversation) {

setTimeout(() => {

try {
recognition.start();
setListening(true);
} catch (e) {}

}, 700);

}

};


/* handle errors */

recognition.onerror = (event) => {

if (event.error === "no-speech") {
return;
}

if (event.error === "aborted") {
return;
}

if (event.error === "not-allowed") {

alert("Microphone permission denied. Please allow microphone access.");

return;
}

console.log("Speech error:", event);

};


/* recognition ended */

recognition.onend = () => {

if (conversation && !listening) {

setTimeout(() => {

try {
recognition.start();
setListening(true);
} catch (e) {}

}, 700);

}

};

}, [conversation, listening, setSpeaking]);


/* START CONVERSATION */

const startConversation = () => {

setConversation(true);

try {

recognitionRef.current.start();

setListening(true);

} catch (e) {}

};


/* STOP CONVERSATION */

const stopConversation = () => {

setConversation(false);

try {
recognitionRef.current.stop();
} catch (e) {}

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