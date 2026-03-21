let audioUnlocked = false;

/* Unlock browser audio (required for Chrome autoplay policy) */

export function unlockAudio() {

if (audioUnlocked) return;

try {

const audio = new Audio();

/* tiny silent audio */

audio.src =
"data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAESsAACJWAAACABAAZGF0YQAAAAA=";

audio.play().catch(()=>{});

audioUnlocked = true;

console.log("Audio unlocked");

} catch (e) {

console.warn("Audio unlock failed", e);

}

}


/* Speak AI text using Sarvam TTS */

export async function speakText(text) {

try {

console.log("TTS request:", text);

const response = await fetch("/.netlify/functions/sarvamTTS", {

method: "POST",

headers: {
"Content-Type": "application/json"
},

body: JSON.stringify({ text })

});

const data = await response.json();

console.log("TTS response:", data);

if (!data.audios || data.audios.length === 0) {

console.error("No audio returned from TTS");

return;

}

const audioBase64 = data.audios[0];

const audioSrc = `data:audio/wav;base64,${audioBase64}`;

const audio = new Audio();

audio.src = audioSrc;

/* slow slightly for natural speech */

audio.playbackRate = 0.9;


/* wait until audio fully loads */

await new Promise((resolve) => {

audio.onloadeddata = resolve;

});


/* small buffer delay */

await new Promise((resolve)=>setTimeout(resolve,120));


/* play audio */

await audio.play();


/* wait until audio finishes */

return new Promise((resolve) => {

audio.onended = () => {

/* extra delay so last word isn't cut */

setTimeout(resolve,300);

};

});

} catch (error) {

console.error("Voice error:", error);

}

}