import React, { useState, useRef, useEffect } from "react";
import { askAI } from "../services/openaiService";
import { speakText } from "../services/sarvamVoiceService";

function ChatBox({ setSpeaking }) {

const [listening, setListening] = useState(false);
const [conversation, setConversation] = useState(false);

const recognitionRef = useRef(null);

/* IMPORTANT: refs for stable loop */
const conversationRef = useRef(false);
const historyRef = useRef([]);

useEffect(() => {

const SpeechRecognition =
window.SpeechRecognition || window.webkitSpeechRecognition;

if (!SpeechRecognition) {
alert("Speech recognition not supported");
return;
}

const recognition = new SpeechRecognition();

recognition.lang = "hi-IN";
recognition.continuous = false;
recognition.interimResults = false;

recognitionRef.current = recognition;

/* when parent speaks */

recognition.onresult = async (event) => {

const question = event.results[0][0].transcript;

console.log("Parent:", question);

setListening(false);

/* update history */

historyRef.current.push({
role: "user",
content: question
});

try {

const answer = await askAI(question, historyRef.current);

console.log("AI:", answer);

/* save AI response */

historyRef.current.push({
role: "assistant",
content: answer
});

/* speak */

setSpeaking(true);

await speakText(answer);

setSpeaking(false);

} catch (error) {

console.error("AI error:", error);

}

/* restart listening */

if (conversationRef.current) {

setTimeout(() => {

try {
recognition.start();
setListening(true);
} catch (err) {}

}, 700);

}

};

/* speech error */

recognition.onerror = (e) => {

console.log("Speech error:", e);
setListening(false);

};

/* when recognition stops */

recognition.onend = () => {

if (conversationRef.current && !listening) {

setTimeout(() => {

try {
recognition.start();
setListening(true);
} catch (err) {}

}, 700);

}

};

}, [setSpeaking, listening]);

/* START CONVERSATION */

const startConversation = () => {

conversationRef.current = true;
setConversation(true);

if (recognitionRef.current) {

try {

recognitionRef.current.start();
setListening(true);

} catch (err) {}

}

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
🎤 Listening...
</p>

)}

</div>

);

}

export default ChatBox;