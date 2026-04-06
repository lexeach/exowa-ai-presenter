exports.handler = async function(){

const response = await fetch(
"https://api.sarvam.ai/samvaad/orgs/YOUR_ORG/workspaces/YOUR_WS/apps/YOUR_APP/url?interaction_type=call",
{
headers:{
"Authorization":"Bearer "+process.env.SARVAM_API_KEY
}
}
)

const data = await response.json()

return{
statusCode:200,
body: JSON.stringify({
url:data.url
})
}

}