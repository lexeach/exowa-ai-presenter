import React from "react";
import AdminLayout from "../components/AdminLayout";

function LearningDashboardPage() {
  const learningData = {
    bestScript: "Education-focused pitch",
    conversionRate: "78%",
    failedCallsLearning: 12,
    objectionScore: "84%",
    autoOptimization: "Enabled",
    bestTimeSlot: "6 PM - 8 PM",
    topObjection: "Price Concern"
  };

  return (
    <AdminLayout>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px"
        }}
      >
        <h1>
          🧠 AI Learning Dashboard
        </h1>

        <div
          style={{
            border: "1px solid #ddd",
            borderRadius: "10px",
            padding: "20px",
            background: "#fff"
          }}
        >
          <p>
            <strong>
              Best Script:
            </strong>{" "}
            {
              learningData.bestScript
            }
          </p>

          <p>
            <strong>
              Conversion Rate:
            </strong>{" "}
            {
              learningData.conversionRate
            }
          </p>

          <p>
            <strong>
              Failed Calls Learning:
            </strong>{" "}
            {
              learningData.failedCallsLearning
            }
          </p>

          <p>
            <strong>
              Objection Score:
            </strong>{" "}
            {
              learningData.objectionScore
            }
          </p>

          <p>
            <strong>
              Auto Optimization:
            </strong>{" "}
            {
              learningData.autoOptimization
            }
          </p>

          <p>
            <strong>
              Best Time Slot:
            </strong>{" "}
            {
              learningData.bestTimeSlot
            }
          </p>

          <p>
            <strong>
              Top Objection:
            </strong>{" "}
            {
              learningData.topObjection
            }
          </p>
        </div>
      </div>
    </AdminLayout>
  );
}

export default LearningDashboardPage;