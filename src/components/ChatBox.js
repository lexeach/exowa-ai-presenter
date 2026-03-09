import React, { useState } from "react";
import { askAI } from "../services/openaiService";
import { speakText } from "../services/elevenLabsService";
function ChatBox() {

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [language, setLanguage] = useState("hi-IN");
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);


  const handleAsk = async (q) => {

    const userQuestion = q || question;

    if (!userQuestion.trim()) {
      alert("Please enter a question");
      return;
    }

    setLoading(true);
    setAnswer("Thinking...");

    try {

      const response = await askAI(userQuestion);

      setAnswer(response);

      speakText(response, language);

    } catch (error) {

      console.error(error);
      setAnswer("Error contacting AI");

    }

    setLoading(false);
  };


  const handleVoice = () => {

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Voice recognition not supported in this browser");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = language;
    recognition.continuous = false;
    recognition.interimResults = false;

    setListening(true);

    recognition.start();


    recognition.onresult = (event) => {

      const voiceText = event.results[0][0].transcript;

      setQuestion(voiceText);

      handleAsk(voiceText);

      recognition.stop();

      setListening(false);

    };


    recognition.onerror = (event) => {

      console.error("Speech recognition error:", event.error);

      recognition.stop();

      setListening(false);

    };


    recognition.onend = () => {

      setListening(false);

    };

  };


  return (

    <div
      style={{
        marginTop: "40px",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "10px",
        maxWidth: "700px"
      }}
    >

      <h3>Ask AI About Exowa</h3>


      {/* Language Selector */}

      <div style={{ marginBottom: "10px" }}>

        <label style={{ marginRight: "10px" }}>
          Select Language:
        </label>

        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          style={{ padding: "6px", borderRadius: "5px" }}
        >

          {languageOptions.map((lang, index) => (

            <option key={index} value={lang.code}>
              {lang.label}
            </option>

          ))}

        </select>

      </div>


      {/* Question Input */}

      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask a question about Exowa..."
        style={{
          width: "60%",
          padding: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc"
        }}
      />


      {/* Ask Button */}

      <button
        onClick={() => handleAsk()}
        disabled={loading}
        style={{
          marginLeft: "10px",
          padding: "10px 20px",
          background: "#2F80ED",
          color: "#fff",
          border: "none",
          borderRadius: "5px"
        }}
      >
        {loading ? "..." : "Ask"}
      </button>


      {/* Voice Button */}

      <button
        onClick={handleVoice}
        style={{
          marginLeft: "10px",
          padding: "10px 20px",
          background: "#27AE60",
          color: "#fff",
          border: "none",
          borderRadius: "5px"
        }}
      >
        {listening ? "Listening..." : "🎤 Speak"}
      </button>


      {/* AI Response */}

      {answer && (

        <div
          style={{
            marginTop: "20px",
            padding: "15px",
            background: "#f5f7fb",
            borderRadius: "8px"
          }}
        >

          <strong>AI:</strong>

          <p>{answer}</p>

        </div>

      )}

    </div>

  );

}

export default ChatBox;