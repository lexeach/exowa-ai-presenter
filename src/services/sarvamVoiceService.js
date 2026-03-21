export async function speakText(text){

const response = await fetch("/.netlify/functions/sarvamTTS",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body: JSON.stringify({text})
});

const data = await response.json();

const audioBase64 = data.audios[0];

const audio = new Audio(`data:audio/wav;base64,${audioBase64}`);

await audio.play();

return new Promise(resolve=>{
audio.onended = resolve;
});

}