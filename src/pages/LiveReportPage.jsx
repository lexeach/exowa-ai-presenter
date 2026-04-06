import React from "react";

function LiveReportPage() {
  const reportData = {
    systemStatus: "Healthy",
    activeCalls: 12,
    queueWaiting: 8,
    failedJobs: 1,
    avgResponseTime: "420 ms",
    uptime: "72 hours"
  };

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial"
      }}
    >
      <h1>📊 Live System Report</h1>

      <div
        style={{
          marginTop: "20px",
          border: "1px solid #ddd",
          borderRadius: "10px",
          padding: "20px",
          background: "#fff"
        }}
      >
        <p>
          <strong>
            System Status:
          </strong>{" "}
          {reportData.systemStatus}
        </p>

        <p>
          <strong>
            Active Calls:
          </strong>{" "}
          {reportData.activeCalls}
        </p>

        <p>
          <strong>
            Queue Waiting:
          </strong>{" "}
          {reportData.queueWaiting}
        </p>

        <p>
          <strong>
            Failed Jobs:
          </strong>{" "}
          {reportData.failedJobs}
        </p>

        <p>
          <strong>
            Avg Response Time:
          </strong>{" "}
          {reportData.avgResponseTime}
        </p>

        <p>
          <strong>
            Uptime:
          </strong>{" "}
          {reportData.uptime}
        </p>
      </div>
    </div>
  );
}

export default LiveReportPage;
