import React from "react";
import AdminLayout from "../components/AdminLayout";
import LeadDashboard from "../components/LeadDashboard";
import SalesAnalytics from "../components/SalesAnalytics";
import CalendarBooking from "../components/CalendarBooking";

function AdminDashboardPage() {
  const leads = [
    {
      name: "Rahul Sharma",
      phone: "9876543210",
      status: "NEW",
      attempts: 1,
      demoTime: "5:00 PM"
    },
    {
      name: "Priya Verma",
      phone: "9876543211",
      status: "DEMO_BOOKED",
      attempts: 2,
      demoTime: "6:30 PM"
    },
    {
      name: "Amit Kumar",
      phone: "9876543212",
      status: "FOLLOW_UP",
      attempts: 1,
      demoTime: "Tomorrow 11:00 AM"
    }
  ];

  const handleBooking = (booking) => {
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
          flexDirection: "column",
          gap: "20px"
        }}
      >
        <h1>
          🛠 Admin Dashboard
        </h1>

        <SalesAnalytics
          totalLeads={50}
          demosBooked={20}
          closedSales={8}
          referrals={15}
        />

        <LeadDashboard
          leads={leads}
        />

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