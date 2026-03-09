import React, { useState } from "react";
import { askAI } from "../services/openaiService";

function ChatBox() {

const [question, setQuestion] = useState("");
const [answer, setAnswer] = useState("");


const handleAsk = async () => {

if(!question){
alert("Please enter a question");
return;
}

setAnswer("Thinking...");

try{

const res = await askAI(question);

setAnswer(res);

}catch(err){

console.error(err);
setAnswer("Error contacting AI");

}

};

return(

<div style={{marginTop:"30px"}}>

<h3>Ask AI About Exowa</h3>

<input
type="text"
value={question}
onChange={(e)=>setQuestion(e.target.value)}
placeholder="Ask a question..."
style={{
width:"60%",
padding:"10px"
}}
/>

<button
onClick={handleAsk}
style={{
marginLeft:"10px",
padding:"10px"
}}
>
Ask
</button>

<p style={{marginTop:"15px"}}>
{answer}
</p>

</div>

);

}

export default ChatBox;