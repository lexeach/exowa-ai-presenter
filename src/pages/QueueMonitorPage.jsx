import React from "react";
import AdminLayout from "../components/AdminLayout";

function QueueMonitorPage() {
  const queueStats = {
    pendingJobs: 8,
    activeJobs: 3,
    completedJobs: 120,
    failedJobs: 2,
    workerStatus: "Running"
  };

  const openBackendQueue = () => {
    window.open(
      "https://your-backend.onrender.com/admin/queues",
      "_blank"
    );
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
          📦 Queue Monitor
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
              Pending Jobs:
            </strong>{" "}
            {
              queueStats.pendingJobs
            }
          </p>

          <p>
            <strong>
              Active Jobs:
            </strong>{" "}
            {
              queueStats.activeJobs
            }
          </p>

          <p>
            <strong>
              Completed Jobs:
            </strong>{" "}
            {
              queueStats.completedJobs
            }
          </p>

          <p>
            <strong>
              Failed Jobs:
            </strong>{" "}
            {
              queueStats.failedJobs
            }
          </p>

          <p>
            <strong>
              Worker Status:
            </strong>{" "}
            {
              queueStats.workerStatus
            }
          </p>

          <button
            onClick={
              openBackendQueue
            }
            style={{
              marginTop: "15px",
              padding:
                "10px 15px",
              border: "none",
              borderRadius:
                "6px",
              cursor: "pointer"
            }}
          >
            Open Backend Queue Panel
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}

export default QueueMonitorPage;