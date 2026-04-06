import React from "react";

function QueueMonitorPage() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>📦 Queue Monitor</h1>
      <p>
        Queue jobs are being monitored
        from backend admin panel.
      </p>

      <p>
        Use Bull Board backend route:
      </p>

      <code>
        /admin/queues
      </code>
    </div>
  );
}

export default QueueMonitorPage;