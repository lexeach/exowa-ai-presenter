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

  const totalLeads =
    leads.length;

  const newLeads =
    leads.filter(
      (lead) =>
        lead.status ===
        "NEW"
    ).length;

  const demoBooked =
    leads.filter(
      (lead) =>
        lead.status ===
        "DEMO_BOOKED"
    ).length;

  const closedSales =
    leads.filter(
      (lead) =>
        lead.status ===
        "CLOSED"
    ).length;

  const handleBooking = (
    booking
  ) => {
    console.log(
      "📅 Booking:",
      booking
    );
  };

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
          demosBooked={
            demoBooked
          }
          closedSales={
            closedSales
          }
          referrals={
            totalLeads
          }
        />

        {/* SUMMARY CARDS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "20px"
          }}
        >
          <Card
            title="👥 Total Leads"
            value={
              totalLeads
            }
          />
          <Card
            title="🆕 New Leads"
            value={
              newLeads
            }
          />
          <Card
            title="📅 Demo Booked"
            value={
              demoBooked
            }
          />
          <Card
            title="💰 Closed Sales"
            value={
              closedSales
            }
          />
        </div>

        {/* LEAD TABLE */}
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
            👥 Latest Leads
          </h2>

          <table
            style={{
              width: "100%",
              borderCollapse:
                "collapse"
            }}
          >
            <thead>
              <tr>
                <th>
                  Name
                </th>
                <th>
                  Phone
                </th>
                <th>
                  Class
                </th>
                <th>
                  Referred By
                </th>
                <th>
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {leads.map(
                (lead) => (
                  <tr
                    key={
                      lead._id
                    }
                  >
                    <td>
                      {
                        lead.name
                      }
                    </td>
                    <td>
                      {
                        lead.phone
                      }
                    </td>
                    <td>
                      {
                        lead.studentClass
                      }
                    </td>
                    <td>
                      {
                        lead.referredBy
                      }
                    </td>
                    <td>
                      {
                        lead.status
                      }
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
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

function Card({
  title,
  value
}) {
  return (
    <div
      style={{
        padding: "20px",
        border:
          "1px solid #ddd",
        borderRadius:
          "10px",
        background:
          "#fff"
      }}
    >
      <h3>{title}</h3>
      <h2>{value}</h2>
    </div>
  );
}

export default AdminDashboardPage;
