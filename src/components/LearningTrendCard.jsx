import React from "react";

function LearningTrendCard({
  trend = []
}) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: "16px",
        borderRadius: "8px",
        marginBottom: "20px"
      }}
    >
      <h2>
        📈 Learning Trend
      </h2>

      {trend.map(
        (point, index) => (
          <p key={index}>
            Day {point.day}:{" "}
            {point.score}
          </p>
        )
      )}
    </div>
  );
}

export default LearningTrendCard;