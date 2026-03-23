const corrections = {

"अशोक":"Exowa",
"अशोवा":"Exowa",
"एक्सोवा":"Exowa",
"एक्सोबा":"Exowa",
"एक्सोवाा":"Exowa",
"एक्सोवा प्लेटफॉर्म":"Exowa",
"अक्टूबर":"Exowa",

"एक्सोवा ऐप":"Exowa",

"कितने रुपए":"फीस कितनी है",
"कितना पैसा":"फीस कितनी है",
"कितनी फीस":"फीस कितनी है",

"कौन सी क्लास":"किस क्लास",
"किस कक्षा":"किस क्लास",

"कैसे शुरू":"registration कैसे",
"कैसे जॉइन":"registration कैसे"

};

export function autoCorrect(text){

let corrected = text;

Object.keys(corrections).forEach(word=>{

const regex = new RegExp(word,"gi");

corrected = corrected.replace(regex, corrections[word]);

});

return corrected;

}