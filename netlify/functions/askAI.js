exports.handler = async function (event) {

try {

const API_KEY = process.env.OPENAI_API_KEY;

if (!event.body) {
return {
statusCode: 400,
body: JSON.stringify({ error: "No request body received" })
};
}

const body = JSON.parse(event.body);
const question = body.question;

if (!question) {
return {
statusCode: 400,
body: JSON.stringify({ error: "Question missing" })
};
}

const response = await fetch(
"https://api.openai.com/v1/chat/completions",
{
method: "POST",
headers: {
"Content-Type": "application/json",
"Authorization": `Bearer ${API_KEY}`
},
body: JSON.stringify({
model: "gpt-4o-mini",
messages: [
{
role: "system",
content: "You explain the Exowa AI mock test platform to parents."
},
{
role: "user",
content: question
}
]
})
}
);

const data = await response.json();

return {
statusCode: 200,
body: JSON.stringify(data)
};

} catch (error) {

return {
statusCode: 500,
body: JSON.stringify({
error: error.message
})
};

}

};