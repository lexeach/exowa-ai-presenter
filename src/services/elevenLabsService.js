export async function speakText(text){

const API_KEY = process.env.REACT_APP_ELEVEN_API_KEY

const voiceId = "21m00Tcm4TlvDq8ikWAM" // default voice

const response = await fetch(
`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
{
method: "POST",

headers:{
"xi-api-key": API_KEY,
"Content-Type": "application/json"
},

body: JSON.stringify({

text: text,

model_id: "eleven_multilingual_v2",

voice_settings:{
stability:0.5,
similarity_boost:0.75
}

})

}
)

const audioBlob = await response.blob()

const audioUrl = URL.createObjectURL(audioBlob)

const audio = new Audio(audioUrl)

audio.play()

}