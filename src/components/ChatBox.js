import React, { useState, useRef } from "react";
import { askAI } from "../services/openaiService";
import { speakText } from "../services/sarvamVoiceService";

function ChatBox({ setSpeaking }) {

const [conversation, setConversation] = useState(false);
const [listening, setListening] = useState(false);

const recognitionRef = useRef(null);
const historyRef = useRef([]);
const conversationRef = useRef(false);

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


recognition.onresult = async (event) => {

const question = event.results[0][0].transcript;

console.log("Parent:", question);

setListening(false);

historyRef.current.push({
role: "user",
content: question
});

try {

const answer = await askAI(question, historyRef.current);

console.log("AI:", answer);

historyRef.current.push({
role: "assistant",
content: answer
});

setSpeaking(true);

await speakText(answer);

setSpeaking(false);

} catch (err) {

console.error("AI error:", err);

}

/* stop mic so it can restart */

recognition.stop();

};


/* mic restart logic */

recognition.onend = () => {

if (conversationRef.current) {

setTimeout(() => {

startRecognition();

}, 400);

}

};


recognition.onerror = (event) => {

if (event.error === "no-speech") return;
if (event.error === "aborted") return;

console.log("Speech error:", event);

};

};


/* start conversation */

const startConversation = () => {

conversationRef.current = true;
setConversation(true);

startRecognition();

};


/* stop conversation */

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