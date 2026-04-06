import React from "react";

function SalesAnalytics({
  totalLeads = 0,
  demosBooked = 0,
  closedSales = 0,
  referrals = 0
}) {
  const conversionRate =
    totalLeads > 0
      ? ((closedSales / totalLeads) * 100).toFixed(1)
      : 0;

  return (
    <div
      style={{
        marginTop: "20px",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "10px",
        background: "#fff"
      }}
    >
      <h2>Sales Analytics</h2>

      <div style={styles.grid}>
        <div style={styles.card}>
          <h3>Total Leads</h3>
          <p>{totalLeads}</p>
        </div>

        <div style={styles.card}>
          <h3>Demos Booked</h3>
          <p>{demosBooked}</p>
        </div>

        <div style={styles.card}>
          <h3>Closed Sales</h3>
          <p>{closedSales}</p>
        </div>

        <div style={styles.card}>
          <h3>Referrals</h3>
          <p>{referrals}</p>
        </div>

        <div style={styles.card}>
          <h3>Conversion %</h3>
          <p>{conversionRate}%</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
    gap: "15px",
    marginTop: "15px"
  },
  card: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "15px",
    textAlign: "center",
    background: "#fafafa"
  }
};

export default SalesAnalytics;