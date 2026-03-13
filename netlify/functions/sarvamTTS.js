export async function handler(event) {

try {

if(event.httpMethod !== "POST"){
return {
statusCode:405,
body:"POST required"
};
}

const body = JSON.parse(event.body || "{}");

const text = body.text;

if(!text){
return {
statusCode:400,
body:JSON.stringify({error:"Text missing"})
};
}

const API_KEY = process.env.SARVAM_API_KEY;

if(!API_KEY){
return {
statusCode:500,
body:JSON.stringify({error:"Sarvam API key missing"})
};
}

const response = await fetch(
"https://api.sarvam.ai/v1/speech/generate",
{
method:"POST",
headers:{
"Content-Type":"application/json",
"Authorization":`Bearer ${API_KEY}`
},
body:JSON.stringify({
text:text,
target_language_code:"hi-IN",
speaker:"meera"
})
}
);

const data = await response.json();

if(!data.audio){

return {
statusCode:500,
body:JSON.stringify(data)
};

}

return {
statusCode:200,
body:JSON.stringify(data)
};

}catch(error){

return {
statusCode:500,
body:JSON.stringify({error:error.message})
};

}

}