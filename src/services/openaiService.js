export async function askAI(question){

try{

const response = await fetch("/.netlify/functions/askAI",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
question
})

});

const data = await response.json();

if(!data || !data.answer){
console.error("Invalid AI response:",data);
return "Sorry, I could not answer that.";
}

return data.answer;

}catch(error){

console.error("AI service error:",error);

return "AI service is temporarily unavailable.";

}

}