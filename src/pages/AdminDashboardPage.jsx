import React from "react";
import LeadDashboard from "../components/LeadDashboard";
import SalesAnalytics from "../components/SalesAnalytics";
import CalendarBooking from "../components/CalendarBooking";

function AdminDashboardPage() {
  const leads = [
    {
      name: "Rahul",
      phone: "9876543210",
      status: "NEW",
      attempts: 1,
      demoTime: "5:00 PM"
    },
    {
      name: "Priya",
      phone: "9876543211",
      status: "DEMO_BOOKED",
      attempts: 2,
      demoTime: "6:30 PM"
    }
  ];

  const handleBooking = (booking) => {
    console.log(
      "📅 Booking:",
      booking
    );
  };

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial",
        background: "#f4f4f4",
        minHeight: "100vh"
      }}
    >
      <h1
        style={{
          marginBottom: "20px"
        }}
      >
        🛠 Admin Dashboard
      </h1>

      <div
        style={{
          marginBottom: "20px"
        }}
      >
        <SalesAnalytics
          totalLeads={50}
          demosBooked={20}
          closedSales={8}
          referrals={15}
        />
      </div>

      <div
        style={{
          marginBottom: "20px"
        }}
      >
        <LeadDashboard
          leads={leads}
        />
      </div>

      <div>
        <CalendarBooking
          onBook={
            handleBooking
          }
        />
      </div>
    </div>
  );
}

export default AdminDashboardPage;
