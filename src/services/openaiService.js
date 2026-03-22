export async function askAI(question, history = []){

try{

const response = await fetch("/.netlify/functions/askAI",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body: JSON.stringify({
question: question,
history: history
})
});

const data = await response.json();

/* error check */

if(data.error){
throw new Error(data.error);
}

/* return answer */

return data.answer;

}catch(error){

console.error("askAI error:", error);

return "माफ कीजिए, अभी मुझे जवाब देने में समस्या हो रही है।";

}

}