export function generateSalesReply(intent){

switch(intent){

case "pricing":

return `अच्छा सवाल है।

Exowa subscription based platform है।
इसमें monthly और yearly plans available हैं।

अधिकतर parents इसलिए इसे पसंद करते हैं क्योंकि बच्चे रोज़ practice कर पाते हैं।

क्या आपका बच्चा अभी किस क्लास में पढ़ता है?`;



case "class":

return `Exowa खास तौर पर class 6 से class 12 तक के students के लिए बनाया गया है।

यहाँ बच्चा अपने syllabus के अनुसार mock tests दे सकता है।

आपका बच्चा अभी किस class में है?`;



case "subjects":

return `Exowa में Mathematics, Science, English और Social Science के mock tests available हैं।

अगर आपका बच्चा किसी subject में weak है
तो वह उसी subject में extra practice कर सकता है।

क्या आपका बच्चा किसी खास subject में help चाहता है?`;



case "features":

return `Exowa की सबसे खास बात है AI generated mock tests।

बच्चा test देता है और तुरंत result और analysis मिल जाता है।

इससे parents को भी पता चलता है कि बच्चा कहाँ strong है और कहाँ improvement चाहिए।

क्या आप इसका demo देखना चाहेंगे?`;



case "registration":

return `Exowa शुरू करना बहुत आसान है।

आप WhatsApp पर JOIN भेजकर Exowa Women Partner Program से जुड़ सकते हैं।

उसके बाद students को platform access मिल जाता है।

क्या आप registration process जानना चाहेंगे?`;



default:

return `Exowa एक AI based mock test platform है।

यह class 6 से 12 तक के students को unlimited practice करने का मौका देता है।

क्या आप इसके features, subjects या pricing के बारे में जानना चाहेंगे?`;

}

}