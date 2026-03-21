export async function askAI(question){

const response = await fetch("/.netlify/functions/askAI",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body: JSON.stringify({
question
})

});

const data = await response.json();

if(data.error){
throw new Error(data.error);
}

return data.answer;

}