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



/* PRELOAD SPEECH */

export async function preloadSpeech(slideIndex,text){

if(audioCache[slideIndex]) return audioCache[slideIndex];

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
return null;
}

const audioBase64 = data.audios[0];

const audioSrc = `data:audio/wav;base64,${audioBase64}`;

const audio = new Audio(audioSrc);

audio.preload = "auto";
audio.volume = 1;
audio.playbackRate = 0.9;

audioCache[slideIndex] = audio;

return audio;

}catch(error){

console.error("Preload error:",error);
return null;

}

}



/* SPEAK TEXT */

export async function speakText(text,slideIndex=null){

try{

let audio;


/* USE CACHE */

if(slideIndex !== null){

audio = audioCache[slideIndex];

/* IF NOT READY → WAIT PRELOAD */

if(!audio){

console.log("Audio not cached, waiting preload...");

audio = await preloadSpeech(slideIndex,text);

}

}else{

audio = await preloadSpeech(Date.now(),text);

}

if(!audio) return;


/* STOP PREVIOUS AUDIO */

if(currentAudio){

currentAudio.pause();
currentAudio = null;

}

currentAudio = audio;


/* RESET PLAY POSITION */

audio.currentTime = 0;


/* PLAY */

await audio.play();


/* WAIT END */

return new Promise(resolve=>{
audio.onended = resolve;
});

}catch(error){

console.error("Voice error:",error);

}

}