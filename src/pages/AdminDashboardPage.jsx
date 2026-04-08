import React, {
  useEffect,
  useState
} from "react";
import apiClient from "../services/apiClient";
import AdminLayout from "../components/AdminLayout";
import SalesAnalytics from "../components/SalesAnalytics";
import CalendarBooking from "../components/CalendarBooking";

function AdminDashboardPage() {
  const [leads, setLeads] =
    useState([]);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads =
    async () => {
      try {
        const response =
          await apiClient.get(
            "/api/leads/all"
          );

        setLeads(
          response.data.data
        );
      } catch (error) {
        console.error(
          "❌ Fetch leads error:",
          error
        );
      }
    };

  const handleBooking = (
    booking
  ) => {
    console.log(
      "📅 Booking:",
      booking
    );
  };

  const totalLeads =
    leads.length;

  const newLeads =
    leads.filter(
      (lead) =>
        lead.status ===
        "NEW"
    ).length;

  return (
    <AdminLayout>
      <div
        style={{
          display: "flex",
          flexDirection:
            "column",
          gap: "20px"
        }}
      >
        <h1>
          🛠 Admin Dashboard
        </h1>

        <SalesAnalytics
          totalLeads={
            totalLeads
          }
          demosBooked={0}
          closedSales={0}
          referrals={
            totalLeads
          }
        />

        <div
          style={{
            padding:
              "20px",
            border:
              "1px solid #ddd",
            borderRadius:
              "10px",
            background:
              "#fff"
          }}
        >
          <h2>
            📊 Live Lead Summary
          </h2>

          <p>
            Total Leads:{" "}
            {
              totalLeads
            }
          </p>

          <p>
            New Leads:{" "}
            {newLeads}
          </p>
        </div>

        <div
          style={{
            padding:
              "20px",
            border:
              "1px solid #ddd",
            borderRadius:
              "10px",
            background:
              "#fff"
          }}
        >
          <h2>
            👥 Lead List
          </h2>

          {leads.map(
            (lead) => (
              <div
                key={
                  lead._id
                }
                style={{
                  padding:
                    "10px 0",
                  borderBottom:
                    "1px solid #eee"
                }}
              >
                <strong>
                  {
                    lead.name
                  }
                </strong>{" "}
                -{" "}
                {
                  lead.phone
                }{" "}
                -{" "}
                {
                  lead.status
                }
              </div>
            )
          )}
        </div>

        <CalendarBooking
          onBook={
            handleBooking
          }
        />
      </div>
    </AdminLayout>
  );
}

export default AdminDashboardPage;
