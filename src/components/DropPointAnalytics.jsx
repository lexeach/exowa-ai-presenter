import React from "react";

function DropPointAnalytics({
  dropPoints = []
}) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: "16px",
        borderRadius: "8px"
      }}
    >
      <h2>
        ⚠ Drop Point Analytics
      </h2>

      {dropPoints.map(
        (item, index) => (
          <p key={index}>
            {item.stage}:{" "}
            {item.count}
          </p>
        )
      )}
    </div>
  );
}

export default DropPointAnalytics;