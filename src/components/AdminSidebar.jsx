import React from "react";
import { Link } from "react-router-dom";

function AdminSidebar() {
  return (
    <div
      style={{
        width: "250px",
        minHeight: "100vh",
        background: "#1F2937",
        color: "#fff",
        padding: "20px"
      }}
    >
      <h2>🛠 Admin</h2>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          marginTop: "20px"
        }}
      >
        <Link
          to="/admin"
          style={linkStyle}
        >
          Dashboard
        </Link>

        <Link
          to="/admin/live-report"
          style={linkStyle}
        >
          Live Report
        </Link>

        <Link
          to="/admin/learning"
          style={linkStyle}
        >
          AI Learning
        </Link>

        <Link
          to="/admin/queues"
          style={linkStyle}
        >
          Queue Monitor
        </Link>
      </div>
    </div>
  );
}

const linkStyle = {
  color: "#fff",
  textDecoration: "none"
};

export default AdminSidebar;