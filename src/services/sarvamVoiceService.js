let audioUnlocked = false;

/* Unlock browser audio */
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

/* Detect narration speed based on text length */
function getSpeechRate(text) {
  const words = text.split(/\s+/).length;

  if (words < 20) return 0.9;
  if (words < 50) return 1;
  if (words < 90) return 1.05;
  return 1.12;
}

/* Add smart pauses for keynote style narration */
function addNaturalPauses(text) {

  let processed = text;

  /* pause after sentences */
  processed = processed.replace(/।/g, "। ... ");
  processed = processed.replace(/\./g, ". ... ");

  /* emphasis words */
  const keywords = [
    "Exowa",
    "AI",
    "practice",
    "exam",
    "confidence",
    "students",
    "parents"
  ];

  keywords.forEach(word => {
    const regex = new RegExp(word, "gi");
    processed = processed.replace(regex, `${word} ...`);
  });

  return processed;
}

export async function speakText(text) {

  try {

    const narrationText = addNaturalPauses(text);

    const response = await fetch("/.netlify/functions/sarvamTTS", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text: narrationText })
    });

    const data = await response.json();

    if (!data.audios || data.audios.length === 0) {
      console.error("No audio returned", data);
      return;
    }

    const audioBase64 = data.audios[0];
    const audioSrc = `data:audio/wav;base64,${audioBase64}`;

    const audio = new Audio(audioSrc);

    const rate = getSpeechRate(text);
    audio.playbackRate = rate;

    await audio.play();

    return new Promise(resolve => {
      audio.onended = resolve;
    });

  } catch (error) {
    console.error("Voice error:", error);
  }
}