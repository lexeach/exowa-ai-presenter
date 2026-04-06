import React from "react";

function LeadDashboard({ leads = [] }) {
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
      <h2>Lead Dashboard</h2>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "15px"
        }}
      >
        <thead>
          <tr>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Phone</th>
            <th style={styles.th}>Status</th>
            <th style={styles.th}>Attempts</th>
            <th style={styles.th}>Demo Time</th>
          </tr>
        </thead>

        <tbody>
          {leads.length === 0 ? (
            <tr>
              <td colSpan="5" style={styles.td}>
                No leads available
              </td>
            </tr>
          ) : (
            leads.map((lead, index) => (
              <tr key={index}>
                <td style={styles.td}>{lead.name}</td>
                <td style={styles.td}>{lead.phone}</td>
                <td style={styles.td}>{lead.status}</td>
                <td style={styles.td}>{lead.attempts}</td>
                <td style={styles.td}>
                  {lead.demoTime || "Not Scheduled"}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  th: {
    border: "1px solid #ddd",
    padding: "10px",
    background: "#f5f5f5"
  },
  td: {
    border: "1px solid #ddd",
    padding: "10px",
    textAlign: "center"
  }
};

export default LeadDashboard;