import React from "react";
import LeadForm from "../components/LeadForm";

function ReferralFormPage() {
  return (
    <div style={{ padding: 20 }}>
      <h1>
        👥 Referral Form
      </h1>

      <LeadForm type="referral" />
    </div>
  );
}

export default ReferralFormPage;