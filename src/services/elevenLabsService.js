export async function speakText(text){

try{

const API_KEY = process.env.REACT_APP_ELEVEN_API_KEY;

if(!API_KEY){
throw new Error("Missing ElevenLabs API key");
}

const voiceId = "21m00Tcm4TlvDq8ikWAM";

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
model_id:"eleven_multilingual_v2",
voice_settings:{
stability:0.5,
similarity_boost:0.75
}
})
}
);

if(!response.ok){

const errorText = await response.text();
console.warn("ElevenLabs API error:", errorText);

throw new Error("ElevenLabs request failed");

}

const blob = await response.blob();

if(blob.size === 0){
throw new Error("Empty audio received");
}

const url = URL.createObjectURL(blob);

const audio = new Audio(url);

await audio.play();

return new Promise(resolve=>{
audio.onended = resolve;
});

}catch(error){

console.warn("Fallback to browser voice:", error);

// Browser voice fallback
return new Promise(resolve=>{

const speech = new SpeechSynthesisUtterance(text);

speech.lang = "hi-IN";
speech.rate = 0.9;

speech.onend = resolve;

window.speechSynthesis.cancel();
window.speechSynthesis.speak(speech);

});

}

}