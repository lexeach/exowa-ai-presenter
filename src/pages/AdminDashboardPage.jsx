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

  const [searchTerm, setSearchTerm] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("ALL");

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

  const filteredLeads =
    leads.filter((lead) => {
      const searchMatch =
        lead.name
          ?.toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          ) ||
        lead.phone?.includes(
          searchTerm
        );

      const statusMatch =
        statusFilter ===
          "ALL" ||
        lead.status ===
          statusFilter;

      return (
        searchMatch &&
        statusMatch
      );
    });

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

        {/* SEARCH + FILTER */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            marginBottom:
              "20px"
          }}
        >
          <input
            placeholder="Search by name or phone"
            value={
              searchTerm
            }
            onChange={(e) =>
              setSearchTerm(
                e.target
                  .value
              )
            }
            style={{
              padding:
                "10px",
              flex: 1
            }}
          />

          <select
            value={
              statusFilter
            }
            onChange={(e) =>
              setStatusFilter(
                e.target
                  .value
              )
            }
            style={{
              padding:
                "10px"
            }}
          >
            <option value="ALL">
              All Status
            </option>
            <option value="NEW">
              NEW
            </option>
            <option value="DEMO_BOOKED">
              DEMO_BOOKED
            </option>
            <option value="NO_RESPONSE">
              NO_RESPONSE
            </option>
            <option value="FOLLOW_UP_PENDING">
              FOLLOW_UP
            </option>
            <option value="CLOSED">
              CLOSED
            </option>
          </select>
        </div>

        {/* LEADS TABLE */}
        <div
          style={{
            padding:
              "20px",
            border:
              "1px solid #ddd",
            borderRadius:
              "10px",
            background:
              "#fff",
            overflowX:
              "auto"
          }}
        >
          <h2>
            👥 Latest Leads
          </h2>

          <table
            style={{
              width: "100%",
              borderCollapse:
                "collapse",
              minWidth:
                "900px"
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
                <th>
                  Call Status
                </th>
                <th>
                  Demo Date
                </th>
                <th>
                  Demo Time
                </th>
                <th>
                  Retry
                </th>
                <th>
                  Next Retry
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredLeads.map(
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
                      <span
                        style={{
                          padding:
                            "4px 8px",
                          borderRadius:
                            "6px",
                          color:
                            "#fff",
                          background:
                            getStatusColor(
                              lead.status
                            )
                        }}
                      >
                        {
                          lead.status
                        }
                      </span>
                    </td>

                    <td>
                      {lead.callStatus ||
                        "NOT_STARTED"}
                    </td>

                    <td>
                      {lead.demoDate ||
                        "-"}
                    </td>

                    <td>
                      {lead.demoTime ||
                        "-"}
                    </td>

                    <td>
                      {lead.retryCount ??
                        0}
                    </td>
                    <td>
  {lead.nextRetryAt
    ? new Date(
        lead.nextRetryAt
      ).toLocaleString(
        "en-IN"
      )
    : "-"}
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

function getStatusColor(
  status
) {
  switch (status) {
    case "NEW":
      return "#2F80ED";

    case "DEMO_BOOKED":
      return "#27AE60";

    case "NO_RESPONSE":
      return "#F2994A";

    case "FOLLOW_UP_PENDING":
      return "#EB5757";

    case "CLOSED":
      return "#6FCF97";

    default:
      return "#999";
  }
}

export default AdminDashboardPage;
