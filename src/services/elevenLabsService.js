export async function speakText(text){

const API_KEY = process.env.REACT_APP_ELEVEN_API_KEY;

if(!API_KEY){
console.error("ElevenLabs API key missing");
return;
}

const voiceId = "21m00Tcm4TlvDq8ikWAM";

try{

const response = await fetch(
`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
{
method:"POST",
headers:{
"xi-api-key":API_KEY,
"Content-Type":"application/json"
},
body:JSON.stringify({
text:text,
model_id:"eleven_multilingual_v2"
})
}
);

if(!response.ok){

const err = await response.text();
console.error("ElevenLabs error:",err);
return;

}

const blob = await response.blob();

if(blob.size === 0){
console.error("Empty audio received");
return;
}

const url = URL.createObjectURL(blob);

const audio = new Audio(url);

await audio.play();

return new Promise(resolve=>{
audio.onended = resolve;
});

}catch(error){

console.error("Voice error:",error);

}

}