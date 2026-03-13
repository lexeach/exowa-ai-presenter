export async function handler(event) {

  try {

    const { text } = JSON.parse(event.body);

    const API_KEY = process.env.SARVAM_API_KEY;

    const response = await fetch(
      "https://api.sarvam.ai/v1/audio/speech",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
          model: "sarvam-tts",
          voice: "meera",
          input: text,
          language: "hi-IN"
        })
      }
    );

    if (!response.ok) {
      const err = await response.text();
      return {
        statusCode: 500,
        body: err
      };
    }

    const audioBuffer = await response.arrayBuffer();

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "audio/mpeg"
      },
      body: Buffer.from(audioBuffer).toString("base64"),
      isBase64Encoded: true
    };

  } catch (error) {

    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };

  }

}