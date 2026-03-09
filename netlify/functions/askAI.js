exports.handler = async function(event){

const API_KEY = process.env.OPENAI_API_KEY

const { question } = JSON.parse(event.body)

const response = await fetch(
"https://api.openai.com/v1/chat/completions",
{
method:"POST",

headers:{
"Content-Type":"application/json",
"Authorization":`Bearer ${API_KEY}`
},

body:JSON.stringify({

model:"gpt-4o-mini",

messages:[
{
role:"system",
content:"You explain Exowa AI mock test platform to parents."
},
{
role:"user",
content:question
}
]

})

}
)

const data = await response.json()

return {
statusCode:200,
body:JSON.stringify(data)
}

}