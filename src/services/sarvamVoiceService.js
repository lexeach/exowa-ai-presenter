export async function speakText(text){

try{

const response = await fetch("/.netlify/functions/sarvamTTS",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({text})
});

const data = await response.json();

if(!data.audios || data.audios.length === 0){

console.error("No audio returned",data);
return;

}

// Sarvam returns base64 audio in audios array
const audioBase64 = data.audios[0];

const audioSrc = `data:audio/wav;base64,${audioBase64}`;

const audio = new Audio(audioSrc);

await audio.play();

return new Promise(resolve=>{
audio.onended = resolve;
});

}catch(error){

console.error("Voice error:",error);

}

}