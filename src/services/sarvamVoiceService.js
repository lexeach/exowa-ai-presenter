let audioUnlocked = false;
let currentAudio = null;

/* Unlock browser audio */

export function unlockAudio() {

if (audioUnlocked) return;

try {

const audio = new Audio();

audio.src =
"data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAESsAACJWAAACABAAZGF0YQAAAAA=";

audio.play().catch(()=>{});

audioUnlocked = true;

console.log("Audio unlocked");

} catch (e) {

console.warn("Audio unlock failed", e);

}

}


/* Speak AI text */

export async function speakText(text) {

try {

console.log("TTS request:", text);

const response = await fetch("/.netlify/functions/sarvamTTS",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body: JSON.stringify({text})

});

const data = await response.json();

console.log("TTS response:", data);

if(!data.audios || data.audios.length === 0){

console.error("No audio returned");

return;

}

const audioBase64 = data.audios[0];

const audioSrc = `data:audio/wav;base64,${audioBase64}`;


/* stop previous audio */

if(currentAudio){
currentAudio.pause();
currentAudio = null;
}


/* create DOM audio */

const audio = document.createElement("audio");

audio.src = audioSrc;

audio.preload = "auto";

audio.playbackRate = 0.9;

document.body.appendChild(audio);

currentAudio = audio;


/* wait until audio ready */

await new Promise(resolve=>{
audio.onloadeddata = resolve;
});


/* play */

await audio.play();


/* wait until finish */

await new Promise(resolve=>{
audio.onended = resolve;
});


/* cleanup */

audio.remove();

currentAudio = null;

}catch(error){

console.error("Voice error:",error);

}

}