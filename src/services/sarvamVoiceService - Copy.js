let currentAudio = null;


/* Unlock audio for browser autoplay */

export function unlockAudio(){

try{

const audio = new Audio();

audio.src =
"data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAESsAACJWAAACABAAZGF0YQAAAAA=";

audio.play().catch(()=>{});

}catch(e){
console.warn("Audio unlock failed");
}

}


/* TTS voice */

export async function speakText(text){

try{

const response = await fetch("/.netlify/functions/sarvamTTS",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body: JSON.stringify({text})
});

const data = await response.json();

if(!data.audios || data.audios.length === 0){
return;
}

const audioBase64 = data.audios[0];
const audioSrc = `data:audio/wav;base64,${audioBase64}`;

if(currentAudio){
currentAudio.pause();
}

const audio = new Audio(audioSrc);
currentAudio = audio;

await audio.play();

return new Promise(resolve=>{
audio.onended = resolve;
});

}catch(error){

console.error("Voice error:",error);

}

}