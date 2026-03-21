export async function askAI(question, history = []) {

try {

const response = await fetch("/.netlify/functions/askAI", {

method: "POST",

headers: {
"Content-Type": "application/json"
},

body: JSON.stringify({
question: question,
history: history
})

});

const data = await response.json();

if (!data || !data.choices || !data.choices[0]) {

console.error("AI Response Error:", data);

return "माफ कीजिए... अभी AI response उपलब्ध नहीं है। कृपया दोबारा पूछिए।";

}

return data.choices[0].message.content;

} catch (error) {

console.error("AI Fetch Error:", error);

return "माफ कीजिए... AI से कनेक्शन नहीं हो पा रहा है।";

}

}