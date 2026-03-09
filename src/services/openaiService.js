export async function askAI(question){

const response = await fetch("https://api.openai.com/v1/chat/completions",{

method:"POST",

headers:{
"Content-Type":"application/json",
"Authorization":"Bearer YOUR_API_KEY"
},

body:JSON.stringify({

model:"gpt-4o-mini",

messages:[
{
role:"system",
content:"You are a sales assistant explaining Exowa AI mock test platform for school students."
},
{
role:"user",
content:question
}
]

})

});

const data = await response.json();

return data.choices[0].message.content;

}