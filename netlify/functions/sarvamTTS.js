const { SarvamAIClient } = require("sarvamai");

exports.handler = async function(event) {

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

return {
statusCode:200,
body: JSON.stringify(response)
};

} catch(error){

return {
statusCode:500,
body: JSON.stringify({error:error.message})
};

}

};