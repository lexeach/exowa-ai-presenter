import React, { useState } from "react";

function CalendarBooking({ onBook }) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleBooking = () => {
    if (!date || !time) {
      alert("Please select date and time");
      return;
    }

    const booking = {
      date,
      time
    };

    console.log("Demo booked:", booking);

    if (onBook) {
      onBook(booking);
    }

    alert(`Demo scheduled on ${date} at ${time}`);
  };

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
      <h2>Book Demo Presentation</h2>

      <div style={{ marginTop: "15px" }}>
        <label>Select Date</label>
        <br />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={styles.input}
        />
      </div>

      <div style={{ marginTop: "15px" }}>
        <label>Select Time</label>
        <br />
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          style={styles.input}
        />
      </div>

      <button onClick={handleBooking} style={styles.button}>
        Schedule Demo
      </button>
    </div>
  );
}

const styles = {
  input: {
    padding: "10px",
    width: "250px",
    marginTop: "5px"
  },
  button: {
    marginTop: "20px",
    padding: "12px 18px",
    background: "#2F80ED",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  }
};

export default CalendarBooking;