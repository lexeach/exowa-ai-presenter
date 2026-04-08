import React, {
  useEffect,
  useState
} from "react";
import apiClient from "../services/apiClient";

import AdminLayout from "../components/AdminLayout";
import LeadDashboard from "../components/LeadDashboard";
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
          error
        );
      }
    };

  return (
    <AdminLayout>
      <h1>
        🛠 Admin Dashboard
      </h1>

      <p>
        Total Leads:{" "}
        {leads.length}
      </p>

      {leads.map(
        (lead) => (
          <div
            key={lead._id}
          >
            {lead.name} -{" "}
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
    </AdminLayout>
  );
}

export default AdminDashboardPage;
