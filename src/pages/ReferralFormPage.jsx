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
      await apiClient.post(
        "/api/leads/create",
        formData
      );

      alert(
        "✅ Lead submitted successfully"
      );
    } catch (error) {
      console.error(
        error
      );
      alert(
        "❌ Submit failed"
      );
    }
  };

  return (
    <form
      onSubmit={
        handleSubmit
      }
    >
      <input
        name="name"
        placeholder="Name"
        onChange={
          handleChange
        }
      />

      <input
        name="phone"
        placeholder="Phone"
        onChange={
          handleChange
        }
      />

      <input
        name="studentClass"
        placeholder="Class"
        onChange={
          handleChange
        }
      />

      <input
        name="referredBy"
        placeholder="Referred By"
        onChange={
          handleChange
        }
      />

      <button
        type="submit"
      >
        Submit
      </button>
    </form>
  );
}

export default ReferralFormPage;
