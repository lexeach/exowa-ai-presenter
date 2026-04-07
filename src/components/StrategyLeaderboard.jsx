import React from "react";

function StrategyLeaderboard({
  strategies = []
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
        🏆 Strategy Leaderboard
      </h2>

      {strategies.map(
        (item, index) => (
          <div
            key={index}
            style={{
              marginBottom: "10px"
            }}
          >
            <strong>
              {item.name}
            </strong>
            <br />
            Success:{" "}
            {item.successRate}%
            <br />
            Score:{" "}
            {item.score}
          </div>
        )
      )}
    </div>
  );
}

export default StrategyLeaderboard;