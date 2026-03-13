import { SarvamAIClient } from "sarvamai";

export async function handler(event) {

try {

if(event.httpMethod !== "POST"){
return {
statusCode:405,
body:"POST required"
};
}

const { text } = JSON.parse(event.body || "{}");

const client = new SarvamAIClient({
apiSubscriptionKey: process.env.SARVAM_API_KEY
});

const response = await client.textToSpeech.convert({
text: text,
target_language_code: "hi-IN"
});

if(!response.audio){

return {
statusCode:500,
body:JSON.stringify({error:"No audio returned"})
};

}

return {
statusCode:200,
body:JSON.stringify(response)
};

} catch(error){

return {
statusCode:500,
body:JSON.stringify({error:error.message})
};

}

}