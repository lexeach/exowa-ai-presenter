import React, { useState } from "react";
import { askAI } from "../services/openaiService";

function ChatBox() {

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {

    if (!question.trim()) {
      alert("Please enter a question");
      return;
    }

    setLoading(true);
    setAnswer("Thinking...");

    try {

      const response = await askAI(question);

      setAnswer(response);

    } catch (error) {

      console.error(error);
      setAnswer("Error contacting AI");

    }

    setLoading(false);
  };

  return (

    <div style={{
      marginTop: "40px",
      padding: "20px",
      border: "1px solid #ddd",
      borderRadius: "10px",
      maxWidth: "700px"
    }}>

      <h3>Ask AI About Exowa</h3>

      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask a question about Exowa..."
        style={{
          width: "70%",
          padding: "10px",
          fontSize: "14px",
          borderRadius: "5px",
          border: "1px solid #ccc"
        }}
      />

      <button
        onClick={handleAsk}
        disabled={loading}
        style={{
          marginLeft: "10px",
          padding: "10px 20px",
          backgroundColor: "#2F80ED",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}
      >
        {loading ? "..." : "Ask"}
      </button>

      {answer && (
        <div style={{
          marginTop: "20px",
          padding: "15px",
          background: "#f5f7fb",
          borderRadius: "8px"
        }}>
          <strong>AI:</strong>
          <p style={{ marginTop: "5px" }}>{answer}</p>
        </div>
      )}

    </div>

  );
}

export default ChatBox;