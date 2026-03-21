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

if(!question){
return {
statusCode:400,
body: JSON.stringify({error:"Question required"})
};
}

const q = question.toLowerCase();

let reply = "";


/* PRODUCT INTRO */

if(
q.includes("exowa") ||
q.includes("क्या है") ||
q.includes("kya hai")
){

reply =
"Exowa एक AI based mock test platform है जो class 6 से 12 तक के students को unlimited practice provide करता है। इससे students अपनी exam preparation बेहतर कर सकते हैं। क्या आप इसके features या subjects के बारे में जानना चाहेंगे?";

}


/* CLASS COVERAGE */

else if(
q.includes("class") ||
q.includes("कक्षा") ||
q.includes("कौन सी क्लास")
){

reply = exowaKnowledge.commonQuestions.classCoverage;

}


/* SUBJECTS */

else if(
q.includes("subject") ||
q.includes("subjects") ||
q.includes("विषय")
){

reply =
"Exowa में ये subjects available हैं: " +
exowaKnowledge.subjects.join(", ") +
". इन सभी subjects के लिए AI generated mock tests मिलते हैं।";

}


/* FEATURES */

else if(
q.includes("feature") ||
q.includes("सुविधा") ||
q.includes("क्या-क्या")
){

reply =
"Exowa के main features हैं: " +
exowaKnowledge.features.join(", ") +
". इससे students को exam preparation में काफी मदद मिलती है।";

}


/* PRACTICE */

else if(
q.includes("practice") ||
q.includes("प्रैक्टिस")
){

reply = exowaKnowledge.commonQuestions.practice;

}


/* EXAM PREPARATION */

else if(
q.includes("exam") ||
q.includes("तैयारी") ||
q.includes("preparation")
){

reply = exowaKnowledge.commonQuestions.examPreparation;

}


/* PARENTS BENEFIT */

else if(
q.includes("parent") ||
q.includes("parents") ||
q.includes("माता") ||
q.includes("अभिभावक")
){

reply = exowaKnowledge.commonQuestions.parentsBenefit;

}


/* PRICING */

else if(
q.includes("price") ||
q.includes("fees") ||
q.includes("फीस") ||
q.includes("price")
){

reply =
"Exowa subscription based platform है। Monthly और yearly plans available हैं ताकि parents अपने budget के अनुसार plan चुन सकें।";

}


/* POSITIVE RESPONSE */

else if(
q.includes("जानना") ||
q.includes("बताइए") ||
q.includes("yes") ||
q.includes("haan")
){

reply =
"ज़रूर। Exowa में students unlimited mock tests दे सकते हैं और हर test के बाद instant feedback मिलता है जिससे उन्हें अपनी weak areas समझने में मदद मिलती है।";

}


/* DEFAULT */

else{

reply =
"Exowa एक AI based mock test platform है जो class 6 से 12 तक के students को unlimited practice provide करता है। क्या आप इसके features, subjects या pricing के बारे में जानना चाहेंगे?";

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