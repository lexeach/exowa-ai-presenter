let currentAudio = null;

export function unlockAudio() {

try {

const audio = new Audio();

audio.src =
"data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAESsAACJWAAACABAAZGF0YQAAAAA=";

audio.play().catch(()=>{});

console.log("Audio unlocked");

} catch (e) {

console.warn("Audio unlock failed", e);

}

}


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
console.error("No audio returned");
return;
}

const audioBase64 = data.audios[0];

const audioSrc = `data:audio/wav;base64,${audioBase64}`;


/* stop previous audio */

if (currentAudio) {

currentAudio.pause();
currentAudio = null;

}


/* create audio */

const audio = new Audio(audioSrc);

audio.preload = "auto";

currentAudio = audio;


/* wait for load */

await new Promise((resolve) => {

audio.onloadeddata = resolve;

});


/* play */

await audio.play();


/* wait until finish */

await new Promise((resolve) => {

audio.onended = resolve;

});

} catch (error) {

console.error("Voice error:", error);

}

}