export async function speakText(text){

const API_KEY = process.env.REACT_APP_ELEVEN_API_KEY;

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
model_id:"eleven_multilingual_v2"
})
}
);

const blob = await response.blob();

const url = URL.createObjectURL(blob);

const audio = new Audio(url);

// play audio
await audio.play();

return new Promise(resolve=>{
audio.onended = resolve;
});

}