import React from "react";
import AdminSidebar from "./AdminSidebar";

function AdminLayout({
  children
}) {
  return (
    <div
      style={{
        display: "flex"
      }}
    >
      <AdminSidebar />

      <div
        style={{
          flex: 1,
          padding: "20px",
          background: "#F9FAFB"
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default AdminLayout;