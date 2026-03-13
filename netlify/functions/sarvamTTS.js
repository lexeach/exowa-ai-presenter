export async function handler(event) {

try {

const { text } = JSON.parse(event.body);

const API_KEY = process.env.SARVAM_API_KEY;

const response = await fetch(
"https://api.sarvam.ai/v1/speech/generate",
{
method: "POST",
headers: {
"Content-Type": "application/json",
"Authorization": `Bearer ${API_KEY}`
},
body: JSON.stringify({
text: text,
speaker: "meera",
target_language_code: "hi-IN"
})
}
);

if (!response.ok) {

const err = await response.text();

console.error("Sarvam API error:", err);

return {
statusCode: 500,
body: err
};

}

const data = await response.json();

if (!data.audio) {

return {
statusCode: 500,
body: JSON.stringify({ error: "No audio returned" })
};

}

return {
statusCode: 200,
headers: {
"Content-Type": "application/json"
},
body: JSON.stringify(data)
};

} catch (error) {

return {
statusCode: 500,
body: JSON.stringify({ error: error.message })
};

}

}