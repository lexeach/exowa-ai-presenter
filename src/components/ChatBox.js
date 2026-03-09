import React, { useState, useRef } from "react";
import { askAI } from "../services/openaiService";
import { speakText } from "../services/elevenLabsService";
import { languageOptions } from "../services/voiceService";

function ChatBox() {

const [question,setQuestion] = useState("");
const [answer,setAnswer] = useState("");
const [language,setLanguage] = useState("hi-IN");
const [loading,setLoading] = useState(false);
const [conversation,setConversation] = useState(false);

const recognitionRef = useRef(null);


const handleAsk = async (q) => {

const userQuestion = q || question;

if(!userQuestion.trim()) return;

setLoading(true);
setAnswer("Thinking...");

try{

const response = await askAI(userQuestion);

setAnswer(response);

// AI speaks
setSpeaking(true);

await speakText(response, language);

setSpeaking(false);

// start listening again if conversation mode
if(conversation){
startListening();
}

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
alert("Voice recognition not supported");
return;
}

const recognition = new SpeechRecognition();

recognition.lang = language;
recognition.continuous = false;
recognition.interimResults = false;

recognitionRef.current = recognition;

recognition.start();

recognition.onresult = (event)=>{

const voiceText = event.results[0][0].transcript;

setQuestion(voiceText);

handleAsk(voiceText);

};

recognition.onerror = ()=>{
recognition.stop();
};

};


const startConversation = () => {

setConversation(true);

startListening();

};


const stopConversation = () => {

setConversation(false);

if(recognitionRef.current){
recognitionRef.current.stop();
}

};


return (

<div style={{
marginTop:"40px",
padding:"20px",
border:"1px solid #ddd",
borderRadius:"10px",
maxWidth:"700px"
}}>

<h3>AI Voice Conversation</h3>


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


{/* Text question */}

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


{/* Voice Buttons */}

<button
onClick={startListening}
style={{
marginLeft:"10px",
padding:"10px",
background:"#27AE60",
color:"#fff"
}}
>
🎤 Speak
</button>


{/* Continuous Conversation */}

{!conversation && (

<button
onClick={startConversation}
style={{
marginLeft:"10px",
padding:"10px",
background:"#F39C12",
color:"#fff"
}}
>
Start Conversation
</button>

)}


{conversation && (

<button
onClick={stopConversation}
style={{
marginLeft:"10px",
padding:"10px",
background:"#E74C3C",
color:"#fff"
}}
>
Stop Conversation
</button>

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