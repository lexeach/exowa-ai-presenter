export async function askAI(question){

const response = await fetch("/.netlify/functions/askAI",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
question:question
})

});

const data = await response.json();

return data.choices[0].message.content;

}