export async function speakText(text) {

  try {

    const API_KEY = process.env.REACT_APP_SARVAM_API_KEY;

    if (!API_KEY) {
      console.error("Sarvam API key missing");
      return;
    }

    const response = await fetch(
      "https://api.sarvam.ai/speech/tts",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
          text: text,
          target_language_code: "hi-IN",
          speaker: "meera",
          format: "wav"
        })
      }
    );

    if (!response.ok) {

      const err = await response.text();
      console.error("Sarvam API error:", err);
      return;

    }

    // API returns audio file
    const blob = await response.blob();

    const audioUrl = URL.createObjectURL(blob);

    const audio = new Audio(audioUrl);

    await audio.play();

    return new Promise(resolve => {
      audio.onended = resolve;
    });

  } catch (error) {

    console.error("Sarvam voice error:", error);

  }

}