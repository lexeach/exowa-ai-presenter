exports.handler = async function (event) {

try {

const OpenAI = require("openai");

const openai = new OpenAI({
apiKey: process.env.OPENAI_API_KEY
});

exports.handler = async function(event){

try{

const { question, history } = JSON.parse(event.body);

const systemPrompt = `
You are an AI education consultant for Exowa.

Speak in simple conversational Hindi.

Your job:

• Explain Exowa platform
• Help parents understand benefits
• Ask questions back to parents
• Handle objections
• Keep answers short
• Sound friendly and human

Important:

Use pauses like "...".

Example speaking style:

"देखिए...
Exowa एक AI based mock test platform है...
जो बच्चों को unlimited practice देता है।"

Always try to ask one follow-up question.
`;

const messages = [
{ role:"system", content: systemPrompt },
...(history || [])
];

const completion = await openai.chat.completions.create({

model:"gpt-4o-mini",
messages: messages,
temperature:0.7

});

return {
statusCode:200,
body: JSON.stringify(completion)
};

}catch(error){

return {
statusCode:500,
body: JSON.stringify({error:error.message})
};

}

};