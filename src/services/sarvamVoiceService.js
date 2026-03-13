export async function speakText(text){

try{

const API_KEY = process.env.REACT_APP_SARVAM_API_KEY;

if(!API_KEY){
console.error("Sarvam API key missing");
return;
}

const response = await fetch(
"https://api.sarvam.ai/v1/tts",
{
method:"POST",
headers:{
"Content-Type":"application/json",
"Authorization":`Bearer ${API_KEY}`
},
body:JSON.stringify({
text:text,
speaker:"meera",
language:"hi-IN"
})
}
);

const data = await response.json();

if(!data.audio){

console.error("Sarvam response error",data);
return;

}

const audioSrc = `data:audio/wav;base64,${data.audio}`;

const audio = new Audio(audioSrc);

await audio.play();

return new Promise(resolve=>{
audio.onended = resolve;
});

}catch(error){

console.error("Sarvam voice error:",error);

}

}