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

if(!data.audio){
console.error("No audio returned",data);
return;
}

const audioSrc = `data:audio/wav;base64,${data.audio}`;

const audio = new Audio(audioSrc);

await audio.play();

return new Promise(resolve=>{
audio.onended = resolve;
});

}catch(error){

console.error("Voice error:",error);

}

}