import React, { useState } from "react";
import { askAI } from "../services/openaiService";

function ChatBox(){

const [question,setQuestion] = useState("");
const [answer,setAnswer] = useState("");

const handleAsk = async () => {

const res = await askAI(question);

setAnswer(res);

}

return(

<div style={{marginTop:"30px"}}>

<h3>Ask AI</h3>

<input
type="text"
value={question}
onChange={(e)=>setQuestion(e.target.value)}
placeholder="Ask about Exowa..."
style={{width:"60%", padding:"8px"}}
/>

<button onClick={handleAsk} style={{marginLeft:"10px"}}>
Ask
</button>

<p style={{marginTop:"15px"}}>{answer}</p>

</div>

);

}

export default ChatBox;