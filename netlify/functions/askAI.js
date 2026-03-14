const { exowaKnowledge } = require("../../src/data/exowaKnowledgeBase");

exports.handler = async function (event) {

try {

const body = JSON.parse(event.body || "{}");

const userQuestion = body.question || body.prompt || "";

if(!userQuestion){
return {
statusCode:400,
body:JSON.stringify({ error:"Question missing"})
};
}

const systemPrompt = `
You are an AI presenter explaining Exowa to parents.

Knowledge base:
${JSON.stringify(exowaKnowledge)}

Rules:
- Answer only about Exowa
- Use simple language
- Maximum 3 sentences
- Focus on student benefits
`;

const response = await fetch("https://api.openai.com/v1/chat/completions",{

method:"POST",

headers:{
"Content-Type":"application/json",
"Authorization":`Bearer ${process.env.OPENAI_API_KEY}`
},

body:JSON.stringify({

model:"gpt-4o-mini",

messages:[
{ role:"system", content: systemPrompt },
{ role:"user", content: userQuestion }
]

})

});

const data = await response.json();

const answer =
data.choices?.[0]?.message?.content || "Sorry, I could not answer that.";

return {

statusCode:200,

body:JSON.stringify({
answer
})

};

}catch(error){

console.error("AI error:",error);

return {

statusCode:500,

body:JSON.stringify({
error:"AI processing error"
})

};

}

};