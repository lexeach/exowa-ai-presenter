import React, {
  useState
} from "react";
import apiClient from "../services/apiClient";

function ReferralFormPage() {
  const [formData, setFormData] =
    useState({
      name: "",
      phone: "",
      studentClass: "",
      referredBy: ""
      preferredCallTime: ""
    });

  const handleChange = (
    e
  ) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value
    });
  };

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    try {
      const response =
        await apiClient.post(
          "/api/leads/create",
          formData
        );

      console.log(
        "✅ Submit success:",
        response.data
      );

      alert(
        response.data
          ?.message ||
          "✅ Lead submitted successfully"
      );

      /* RESET FORM AFTER SUCCESS */
      setFormData({
        name: "",
        phone: "",
        studentClass:
          "",
        referredBy: ""
      });
    } catch (error) {
      console.error(
        "❌ Submit error:",
        error.response
          ?.data || error
      );

      const errorMessage =
        error.response
          ?.data
          ?.message ||
        "❌ Submit failed";

      alert(errorMessage);
    }
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "40px auto",
        padding: "20px",
        border:
          "1px solid #ddd",
        borderRadius: "10px",
        background:
          "#ffffff"
      }}
    >
      <h2>
        📋 Referral Form
      </h2>

      <form
        onSubmit={
          handleSubmit
        }
        style={{
          display: "flex",
          flexDirection:
            "column",
          gap: "12px"
        }}
      >
        <input
          name="name"
          placeholder="Name"
          value={
            formData.name
          }
          onChange={
            handleChange
          }
        />

        <input
          name="phone"
          placeholder="Phone"
          value={
            formData.phone
          }
          onChange={
            handleChange
          }
        />

        <input
          name="studentClass"
          placeholder="Class"
          value={
            formData.studentClass
          }
          onChange={
            handleChange
          }
        />

        <input
          name="referredBy"
          placeholder="Referred By"
          value={
            formData.referredBy
          }
          onChange={
            handleChange
          }
        />
        <input
          type="time"
          name="preferredCallTime"
          value={formData.preferredCallTime}
          onChange={handleChange}
          />
        <button
          type="submit"
          style={{
            padding:
              "10px",
            border: "none",
            borderRadius:
              "6px",
            cursor:
              "pointer"
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default ReferralFormPage;
