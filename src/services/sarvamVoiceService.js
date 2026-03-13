export async function speakText(text) {

  try {

    const API_KEY = process.env.REACT_APP_SARVAM_API_KEY;

    if (!API_KEY) {
      console.error("Sarvam API key missing");
      return;
    }

    const response = await fetch(
      "https://api.sarvam.ai/v1/text-to-speech",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-subscription-key": API_KEY
        },
        body: JSON.stringify({
          input: text,
          voice: "meera",
          language: "hi-IN"
        })
      }
    );

    if (!response.ok) {
      const err = await response.text();
      console.error("Sarvam API error:", err);
      return;
    }

    // API returns audio file directly
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