const { exowaKnowledge } = require("../../src/data/exowaKnowledgeBase");

exports.handler = async function(event){

try{

if(event.httpMethod !== "POST"){
return {
statusCode:405,
body:"POST required"
};
}

const { question } = JSON.parse(event.body || "{}");

const q = question.toLowerCase();

let reply = "";

/* class coverage */

if(q.includes("class") || q.includes("कक्षा")){

reply = exowaKnowledge.commonQuestions.classCoverage;

}

/* practice */

else if(q.includes("practice") || q.includes("प्रैक्टिस")){

reply = exowaKnowledge.commonQuestions.practice;

}

/* exam */

else if(q.includes("exam") || q.includes("तैयारी")){

reply = exowaKnowledge.commonQuestions.examPreparation;

}

/* parents */

else if(q.includes("parent") || q.includes("माता") || q.includes("अभिभावक")){

reply = exowaKnowledge.commonQuestions.parentsBenefit;

}

/* subjects */

else if(q.includes("subject") || q.includes("विषय")){

reply = "Exowa में ये subjects available हैं: " + exowaKnowledge.subjects.join(", ");

}

/* features */

else if(q.includes("feature") || q.includes("सुविधा")){

reply = "Exowa के main features हैं: " + exowaKnowledge.features.join(", ");

}

/* pricing */

else if(q.includes("price") || q.includes("fees") || q.includes("price")){

reply = exowaKnowledge.pricing.note;

}

/* default */

else{

reply =
"Exowa एक AI based mock test platform है जो class 6 से 12 तक के students को unlimited practice provide करता है। क्या आप इसके features या subjects के बारे में जानना चाहेंगे?";

}

return{
statusCode:200,
body: JSON.stringify({
answer: reply
})
};

}catch(error){

return{
statusCode:500,
body: JSON.stringify({error:error.message})
};

}

};