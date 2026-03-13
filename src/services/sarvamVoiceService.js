export async function speakText(text){

try{

const API_KEY = process.env.REACT_APP_SARVAM_API_KEY;

if(!API_KEY){
console.error("Sarvam API key missing");
return;
}

const response = await fetch(
"https://api.sarvam.ai/v1/text-to-speech",
{
method:"POST",
headers:{
"Content-Type":"application/json",
"Authorization": `Bearer ${API_KEY}`
},
body: JSON.stringify({
text: text,
voice: "meera",
language: "hi-IN",
format: "wav"
})
}
);

if(!response.ok){

const errorText = await response.text();
console.error("Sarvam API error:", errorText);
return;

}

const blob = await response.blob();

const url = URL.createObjectURL(blob);

const audio = new Audio(url);

await audio.play();

return new Promise(resolve=>{
audio.onended = resolve;
});

}catch(error){

console.error("Sarvam voice error:", error);

}

}