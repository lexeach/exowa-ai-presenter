const OpenAI = require("openai");

exports.handler = async function (event) {

try {

if (event.httpMethod !== "POST") {
return {
statusCode: 405,
body: "POST request required"
};
}

const { question, history } = JSON.parse(event.body || "{}");

if (!question) {
return {
statusCode: 400,
body: JSON.stringify({ error: "Question is required" })
};
}

const openai = new OpenAI({
apiKey: process.env.OPENAI_API_KEY
});

const systemPrompt = `
You are an AI education consultant for Exowa.

Speak in simple conversational Hindi.

Your role:

• Explain Exowa platform to parents
• Help them understand benefits
• Answer questions about learning
• Ask follow-up questions
• Sound friendly and human

Important speaking style:

Use pauses like "..."

Example tone:

"देखिए...
Exowa एक AI based mock test platform है...
जो बच्चों को unlimited practice देता है।"

Keep responses short and natural.

Always try to ask one follow-up question.
`;

const messages = [
{ role: "system", content: systemPrompt },
...(history || []),
{ role: "user", content: question }
];

const completion = await openai.chat.completions.create({
model: "gpt-4o-mini",
messages: messages,
temperature: 0.7
});

return {
statusCode: 200,
headers: {
"Content-Type": "application/json"
},
body: JSON.stringify(completion)
};

} catch (error) {

console.error("AI ERROR:", error);

return {
statusCode: 500,
body: JSON.stringify({
error: error.message
})
};

}

};