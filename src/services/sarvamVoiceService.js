export async function speakText(text) {

  try {

    const response = await fetch("/.netlify/functions/sarvamTTS", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text })
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("TTS error:", err);
      return;
    }

    const blob = await response.blob();

    const audioUrl = URL.createObjectURL(blob);

    const audio = new Audio(audioUrl);

    await audio.play();

    return new Promise(resolve => {
      audio.onended = resolve;
    });

  } catch (error) {

    console.error("Voice error:", error);

  }

}