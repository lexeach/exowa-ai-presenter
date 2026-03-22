const { exowaKnowledge } = require("../../src/data/exowaKnowledgeBase");

exports.handler = async function(event){

try{

if(event.httpMethod !== "POST"){
return { statusCode:405, body:"POST required" };
}

const { question } = JSON.parse(event.body || "{}");

const q = question.toLowerCase();

let reply = "";


/* PRICE */

if(
q.includes("price") ||
q.includes("fees") ||
q.includes("फीस") ||
q.includes("कितने") ||
q.includes("रुपए")
){

reply =
"Exowa subscription based platform है। Monthly और yearly plans available हैं ताकि parents अपने budget के अनुसार plan चुन सकें।";

}


/* CLASS */

else if(
q.includes("class") ||
q.includes("कक्षा") ||
q.includes("किस क्लास")
){

reply =
"Exowa class 6 से 12 तक के students के लिए design किया गया है।";

}


/* SUBJECT */

else if(
q.includes("subject") ||
q.includes("विषय")
){

reply =
"Exowa में Mathematics, Science, English और Social Science के mock tests available हैं।";

}


/* FEATURES */

else if(
q.includes("feature") ||
q.includes("सुविधा")
){

reply =
"Exowa के main features हैं AI generated mock tests, unlimited practice, instant feedback और custom question paper generation।";

}


/* PRACTICE */

else if(
q.includes("practice") ||
q.includes("प्रैक्टिस")
){

reply =
"Exowa AI technology का use करके unlimited practice questions generate करता है जिससे students exam preparation बेहतर कर सकते हैं।";

}


/* DEFAULT */

else{

reply =
"Exowa एक AI based mock test platform है जो class 6 से 12 तक के students को unlimited practice provide करता है। क्या आप इसके features, subjects या pricing के बारे में जानना चाहेंगे?";

}

return{
statusCode:200,
body: JSON.stringify({ answer: reply })
};

}catch(error){

return{
statusCode:500,
body: JSON.stringify({ error:error.message })
};

}

};