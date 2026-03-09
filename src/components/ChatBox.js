import React, { useState, useRef } from "react";
import { askAI } from "../services/openaiService";
import { speakText } from "../services/elevenLabsService";
import { languageOptions } from "../services/voiceService";

function ChatBox({ setSpeaking }) {

const [question,setQuestion] = useState("");
const [answer,setAnswer] = useState("");
const [language,setLanguage] = useState("hi-IN");
const [loading,setLoading] = useState(false);
const [listening,setListening] = useState(false);

const recognitionRef = useRef(null);


const handleAsk = async (q) => {

const userQuestion = q || question;

if(!userQuestion.trim()) return;

setLoading(true);
setAnswer("Thinking...");

try{

const response = await askAI(userQuestion);

setAnswer(response);

setSpeaking(true);

await speakText(response);

setSpeaking(false);

}catch(error){

console.error(error);
setAnswer("Error contacting AI");

}

setLoading(false);

};


const startListening = () => {

const SpeechRecognition =
window.SpeechRecognition || window.webkitSpeechRecognition;

if(!SpeechRecognition){
alert("Speech recognition not supported in this browser");
return;
}

const recognition = new SpeechRecognition();

recognition.lang = language;
recognition.continuous = false;
recognition.interimResults = false;

recognitionRef.current = recognition;

console.log("Mic started");

setListening(true);

recognition.start();

recognition.onresult = (event)=>{

const voiceText = event.results[0][0].transcript;

console.log("You said:", voiceText);

setQuestion(voiceText);

handleAsk(voiceText);

};

recognition.onerror = (event)=>{

console.error("Speech error:", event.error);

setListening(false);

recognition.stop();

};

recognition.onend = ()=>{

console.log("Mic stopped");

setListening(false);

};

};


return (

<div style={{
marginTop:"40px",
padding:"20px",
border:"1px solid #ddd",
borderRadius:"10px",
maxWidth:"700px"
}}>

<h3>Ask AI About Exowa</h3>

{/* Language */}

<div style={{marginBottom:"10px"}}>

<label style={{marginRight:"10px"}}>Language:</label>

<select
value={language}
onChange={(e)=>setLanguage(e.target.value)}
>

{languageOptions.map((lang,index)=>(
<option key={index} value={lang.code}>
{lang.label}
</option>
))}

</select>

</div>


{/* Input */}

<input
type="text"
value={question}
onChange={(e)=>setQuestion(e.target.value)}
placeholder="Ask about Exowa..."
style={{
width:"60%",
padding:"10px"
}}
/>


<button
onClick={()=>handleAsk()}
style={{
marginLeft:"10px",
padding:"10px"
}}
>
Ask
</button>


{/* Speak Button */}

<button
onClick={startListening}
style={{
marginLeft:"10px",
padding:"10px",
background: listening ? "#E74C3C" : "#27AE60",
color:"#fff"
}}
>
{listening ? "Listening..." : "🎤 Speak"}
</button>


{/* Listening indicator */}

{listening && (

<p style={{
marginTop:"10px",
color:"#E74C3C",
fontWeight:"bold"
}}>
🎤 AI is listening...
</p>

)}


{/* AI Response */}

{answer && (

<div style={{
marginTop:"20px",
background:"#f5f7fb",
padding:"15px",
borderRadius:"8px"
}}>

<strong>AI:</strong>

<p>{answer}</p>

</div>

)}

</div>

);

}

export default ChatBox;