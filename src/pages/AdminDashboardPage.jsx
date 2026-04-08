import React, { useEffect, useState } from "react";
import apiClient from "../services/apiClient";
import AdminLayout from "../components/AdminLayout";
import SalesAnalytics from "../components/SalesAnalytics";
import CalendarBooking from "../components/CalendarBooking";

function AdminDashboardPage() {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const response = await apiClient.get("/api/leads/all");
      setLeads(response.data.data);
    } catch (error) {
      console.error("❌ Fetch leads error:", error);
    }
  };

  // --- NEW FUNCTION ADDED HERE ---
  const updateStatus = async (id, status) => {
    try {
      await apiClient.put(`/api/leads/status/${id}`, { status });
      fetchLeads(); // Refresh list to show updated status
    } catch (error) {
      console.error("❌ Status update error:", error);
    }
  };

  const totalLeads = leads.length;
  const newLeads = leads.filter((lead) => lead.status === "NEW").length;
  const demoBooked = leads.filter((lead) => lead.status === "DEMO_BOOKED").length;
  const closedSales = leads.filter((lead) => lead.status === "CLOSED").length;

  const handleBooking = (booking) => {
    console.log("📅 Booking:", booking);
  };

  return (
    <AdminLayout>
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <h1>🛠 Admin Dashboard</h1>

        <SalesAnalytics
          totalLeads={totalLeads}
          demosBooked={demoBooked}
          closedSales={closedSales}
          referrals={totalLeads}
        />

        {/* SUMMARY CARDS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "20px",
          }}
        >
          <Card title="👥 Total Leads" value={totalLeads} />
          <Card title="🆕 New Leads" value={newLeads} />
          <Card title="📅 Demo Booked" value={demoBooked} />
          <Card title="💰 Closed Sales" value={closedSales} />
        </div>

        {/* LEAD TABLE */}
        <div
          style={{
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "10px",
            background: "#fff",
          }}
        >
          <h2>👥 Latest Leads</h2>

          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ textAlign: "left", borderBottom: "2px solid #eee" }}>
                <th style={{ padding: "10px" }}>Name</th>
                <th style={{ padding: "10px" }}>Phone</th>
                <th style={{ padding: "10px" }}>Class</th>
                <th style={{ padding: "10px" }}>Referred By</th>
                <th style={{ padding: "10px" }}>Status</th>
              </tr>
            </thead>

            <tbody>
              {leads.map((lead) => (
                <tr key={lead._id} style={{ borderBottom: "1px solid #eee" }}>
                  <td style={{ padding: "10px" }}>{lead.name}</td>
                  <td style={{ padding: "10px" }}>{lead.phone}</td>
                  <td style={{ padding: "10px" }}>{lead.studentClass}</td>
                  <td style={{ padding: "10px" }}>{lead.referredBy || "N/A"}</td>
                  <td style={{ padding: "10px" }}>
                    {/* DROPDOWN TO UPDATE STATUS */}
                    <select
                      value={lead.status}
                      onChange={(e) => updateStatus(lead._id, e.target.value)}
                      style={{
                        padding: "5px",
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                      }}
                    >
                      <option value="NEW">NEW</option>
                      <option value="DEMO_BOOKED">DEMO BOOKED</option>
                      <option value="CLOSED">CLOSED</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <CalendarBooking onBook={handleBooking} />
      </div>
    </AdminLayout>
  );
}

function Card({ title, value }) {
  return (
    <div
      style={{
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "10px",
        background: "#fff",
      }}
    >
      <h3>{title}</h3>
      <h2>{value}</h2>
    </div>
  );
}

export default AdminDashboardPage;
