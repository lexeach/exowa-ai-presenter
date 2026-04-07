import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 20px",
        background: "#2F80ED",
        color: "#fff"
      }}
    >
      <h2 style={{ margin: 0 }}>
        EXOWA AI
      </h2>

      <div
        style={{
          display: "flex",
          gap: "20px"
        }}
      >
        <Link
          to="/"
          style={{
            color: "#fff",
            textDecoration: "none"
          }}
        >
          Home
        </Link>

        <Link
          to="/referral"
          style={{
            color: "#fff",
            textDecoration: "none"
          }}
        >
          Referral
        </Link>

        <Link
          to="/admin"
          style={{
            color: "#fff",
            textDecoration: "none"
          }}
        >
          Admin
        </Link>
      </div>
    </div>
  );
}

export default Navbar;