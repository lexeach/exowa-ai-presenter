import React from "react";

function ReinforcementDashboard() {
  return (
    <div style={{ padding: "20px" }}>
      <h2>🧠 AI Learning Dashboard</h2>

      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: "10px",
          padding: "20px",
          marginTop: "20px",
        }}
      >
        <p>
          Best script conversion: 78%
        </p>

        <p>
          Failed calls learning: 12
        </p>

        <p>
          Objection handling score: 84%
        </p>

        <p>
          Suggested pitch:
          Education-focused
        </p>
      </div>
    </div>
  );
}

export default ReinforcementDashboard;
