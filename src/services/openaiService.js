export async function askAI(question, history = []){

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

if(data.error){
throw new Error(data.error);
}

return data.choices[0].message.content;

}