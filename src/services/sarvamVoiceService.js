let audioContext = null;
let audioUnlocked = false;

export function unlockAudio() {

if (audioUnlocked) return;

try {

audioContext = new (window.AudioContext || window.webkitAudioContext)();

audioUnlocked = true;

console.log("Audio unlocked");

} catch (e) {

console.warn("Audio unlock failed", e);

}

}

export async function speakText(text) {

try {

if (!audioContext) {
audioContext = new (window.AudioContext || window.webkitAudioContext)();
}

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

if (!data.audios || data.audios.length === 0) {
console.error("No audio returned");
return;
}

const audioBase64 = data.audios[0];

const binary = atob(audioBase64);
const bytes = new Uint8Array(binary.length);

for (let i = 0; i < binary.length; i++) {
bytes[i] = binary.charCodeAt(i);
}

const buffer = await audioContext.decodeAudioData(bytes.buffer);

const source = audioContext.createBufferSource();

source.buffer = buffer;
source.connect(audioContext.destination);

source.start(0);

await new Promise(resolve=>{
source.onended = resolve;
});

} catch (error) {

console.error("Voice error:", error);

}

}