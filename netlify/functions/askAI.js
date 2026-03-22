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
q.includes("कीमत") ||
q.includes("कितना") ||
q.includes("कितनी") ||
q.includes("रुपए")
){

reply =
"Exowa subscription based platform है। Monthly और yearly plans available हैं। आमतौर पर यह इतना affordable रखा गया है कि हर parent अपने बच्चे को regular practice करा सके।";

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
q.includes("विषय") ||
q.includes("physics") ||
q.includes("math") ||
q.includes("science")
){

reply =
"Exowa में Mathematics, Science, English और Social Science के mock tests available हैं। अगर आपका बच्चा Physics में weak है तो वह उसी subject में unlimited practice कर सकता है।";

}


/* FEATURES */

else if(
q.includes("feature") ||
q.includes("सुविधा") ||
q.includes("कैसे काम")
){

reply =
"Exowa AI generated mock tests देता है। बच्चा test देता है और तुरंत result और analysis मिल जाता है जिससे उसे अपनी weak areas समझ में आते हैं।";

}


/* REGISTRATION */

else if(
q.includes("register") ||
q.includes("registration") ||
q.includes("कैसे शुरू")
){

reply =
"Exowa में registration बहुत आसान है। आप WhatsApp पर JOIN भेजकर Women Partner Program से जुड़ सकते हैं और फिर students को platform access मिल जाता है।";

}


/* INTEREST */

else if(
q.includes("ठीक") ||
q.includes("जानना") ||
q.includes("बताओ") ||
q.includes("हाँ") ||
q.includes("bilkul")
){

reply =
"ज़रूर। Exowa में student unlimited mock tests दे सकता है और हर test के बाद instant feedback मिलता है जिससे उसकी preparation लगातार improve होती रहती है।";

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