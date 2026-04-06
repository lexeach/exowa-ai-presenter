import React, { useState } from "react";
import apiClient from "../services/apiClient";

function LeadForm({ type = "lead" }) {
  const [form, setForm] = useState({
    parentName: "",
    phone: "",
    studentClass: "",
    city: "",
    referredBy: "",
    referralPhone: ""
  });

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await apiClient.post(
        "/leads/create",
        {
          ...form,
          source: type
        }
      );

      alert("Submitted successfully");

      setForm({
        parentName: "",
        phone: "",
        studentClass: "",
        city: "",
        referredBy: "",
        referralPhone: ""
      });
    } catch (error) {
      alert("Submit failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Parent Name"
        value={form.parentName}
        onChange={(e) =>
          handleChange(
            "parentName",
            e.target.value
          )
        }
      />

      <input
        placeholder="Phone Number"
        value={form.phone}
        onChange={(e) =>
          handleChange(
            "phone",
            e.target.value
          )
        }
      />

      <input
        placeholder="Student Class"
        value={form.studentClass}
        onChange={(e) =>
          handleChange(
            "studentClass",
            e.target.value
          )
        }
      />

      <input
        placeholder="City"
        value={form.city}
        onChange={(e) =>
          handleChange(
            "city",
            e.target.value
          )
        }
      />

      {type === "referral" && (
        <>
          <input
            placeholder="Referred By"
            value={form.referredBy}
            onChange={(e) =>
              handleChange(
                "referredBy",
                e.target.value
              )
            }
          />

          <input
            placeholder="Referral Phone"
            value={
              form.referralPhone
            }
            onChange={(e) =>
              handleChange(
                "referralPhone",
                e.target.value
              )
            }
          />
        </>
      )}

      <button type="submit">
        Submit
      </button>
    </form>
  );
}

export default LeadForm;