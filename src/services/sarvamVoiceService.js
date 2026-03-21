let audioUnlocked = false;

export function unlockAudio() {
  if (audioUnlocked) return;

  try {
    const audio = new Audio();
    audio.src =
      "data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAESsAACJWAAACABAAZGF0YQAAAAA=";
    audio.play().catch(() => {});
    audioUnlocked = true;
  } catch (e) {
    console.warn("Audio unlock failed", e);
  }
}

export async function speakText(text) {

try {

const response = await fetch("/.netlify/functions/sarvamTTS", {
method: "POST",
headers: {
"Content-Type": "application/json"
},
body: JSON.stringify({ text })
});

const data = await response.json();

if (!data.audios || data.audios.length === 0) {
console.error("No audio returned", data);
return;
}

const audioBase64 = data.audios[0];
const audioSrc = `data:audio/wav;base64,${audioBase64}`;

const audio = new Audio();

audio.src = audioSrc;
audio.playbackRate = 0.9;

/* wait until audio fully loads */

await new Promise((resolve) => {
audio.onloadedmetadata = resolve;
});

/* small buffer delay */

await new Promise((resolve) => setTimeout(resolve, 150));

await audio.play();

/* wait until audio ends */

await new Promise((resolve) => {
audio.onended = () => {

/* extra delay so last words are not cut */

setTimeout(resolve, 300);

};
});

} catch (error) {

console.error("Voice error:", error);

}

}