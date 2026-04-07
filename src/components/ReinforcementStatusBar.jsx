import React from "react";

function ReinforcementStatsBar({
  stats
}) {
  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        marginBottom: "20px"
      }}
    >
      <div>
        <h3>
          🧠 Learning Cycles
        </h3>
        <p>
          {stats.cycles}
        </p>
      </div>

      <div>
        <h3>
          🎯 Best Strategy
        </h3>
        <p>
          {stats.bestStrategy}
        </p>
      </div>

      <div>
        <h3>
          📈 Conversion Lift
        </h3>
        <p>
          {stats.lift}%
        </p>
      </div>

      <div>
        <h3>
          🔥 Avg Score
        </h3>
        <p>
          {stats.avgScore}
        </p>
      </div>
    </div>
  );
}

export default ReinforcementStatsBar;