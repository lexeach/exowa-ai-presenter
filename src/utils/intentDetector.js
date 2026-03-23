export function detectIntent(question){

const q = question.toLowerCase();

if(
q.includes("फीस") ||
q.includes("price") ||
q.includes("कितना") ||
q.includes("कितनी")
){
return "pricing";
}

if(
q.includes("क्लास") ||
q.includes("कक्षा")
){
return "class";
}

if(
q.includes("subject") ||
q.includes("physics") ||
q.includes("math") ||
q.includes("science") ||
q.includes("विषय")
){
return "subjects";
}

if(
q.includes("कैसे काम") ||
q.includes("feature") ||
q.includes("कैसे पढ़ेगा")
){
return "features";
}

if(
q.includes("register") ||
q.includes("join") ||
q.includes("कैसे शुरू")
){
return "registration";
}

return "general";

}