let currentAudio = null;

/* unlock audio for browser autoplay */

export function unlockAudio(){

try{

const audio = new Audio();

audio.src =
"data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAESsAACJWAAACABAAZGF0YQAAAAA=";

audio.play().catch(()=>{});

console.log("Audio unlocked");

}catch(e){

console.warn("Audio unlock failed",e);

}

}


/* speak AI text */

export async function speakText(text){

try{

console.log("TTS request:",text);

const response = await fetch("/.netlify/functions/sarvamTTS",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body: JSON.stringify({text})
});

const data = await response.json();

console.log("TTS response:",data);

if(!data.audios || data.audios.length===0){
console.error("No audio returned");
return;
}

const audioBase64 = data.audios[0];

const audioSrc = `data:audio/wav;base64,${audioBase64}`;

if(currentAudio){
currentAudio.pause();
currentAudio=null;
}

const audio = new Audio(audioSrc);

audio.preload="auto";
audio.volume=1;

currentAudio=audio;

await new Promise(resolve=>{
audio.onloadedmetadata=resolve;
});

await audio.play();

return new Promise(resolve=>{
audio.onended=resolve;
});

}catch(error){

console.error("Voice error:",error);

}

}