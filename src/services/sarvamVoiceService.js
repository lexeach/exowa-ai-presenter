let currentAudio = null;

/* AUDIO CACHE */

const audioCache = {};


/* Unlock browser audio */

export function unlockAudio(){

try{

const audio = new Audio();

audio.src =
"data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAESsAACJWAAACABAAZGF0YQAAAAA=";

audio.play().catch(()=>{});

}catch(e){

console.warn("Audio unlock failed",e);

}

}



/* PRELOAD NEXT SLIDE AUDIO */

export async function preloadSpeech(slideIndex,text){

if(audioCache[slideIndex]) return;

try{

console.log("Preloading slide:",slideIndex);

const response = await fetch("/.netlify/functions/sarvamTTS",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body: JSON.stringify({text})
});

const data = await response.json();

if(!data.audios || data.audios.length===0){
console.error("No preload audio returned");
return;
}

const audioBase64 = data.audios[0];

const audioSrc = `data:audio/wav;base64,${audioBase64}`;

const audio = new Audio(audioSrc);

audio.preload="auto";
audio.volume=1;
audio.playbackRate=0.9;

audioCache[slideIndex] = audio;

}catch(error){

console.error("Preload error:",error);

}

}



/* TEXT TO SPEECH */

export async function speakText(text,slideIndex=null){

try{

console.log("TTS request:",text);

let audio;


/* USE CACHE IF AVAILABLE */

if(slideIndex !== null && audioCache[slideIndex]){

console.log("Using cached audio for slide",slideIndex);

audio = audioCache[slideIndex];

}else{

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

audio = new Audio(audioSrc);

audio.preload="auto";
audio.volume=1;
audio.playbackRate=0.9;

}


/* STOP PREVIOUS AUDIO */

if(currentAudio){
currentAudio.pause();
currentAudio=null;
}

currentAudio = audio;


/* WAIT BUFFER */

await new Promise(resolve=>{
audio.oncanplaythrough=resolve;
});


/* PLAY */

await audio.play();


/* WAIT FINISH */

return new Promise(resolve=>{
audio.onended=resolve;
});

}catch(error){

console.error("Voice error:",error);

}

}