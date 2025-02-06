import React, { useState } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:8000"; // FastAPI backend URL

const PolicyForm = ({ userId, onPolicyCreated }) => {
  const [policyNumber, setPolicyNumber] = useState(""); // State to store policy number
  const [policyType, setPolicyType] = useState(""); // State to store policy type
  const [amount, setAmount] = useState(""); // State to store policy amount
  const [policyCreated, setPolicyCreated] = useState(false); // Track if policy is created
  const [error, setError] = useState(""); // To track error messages

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation before submission
    if (!policyNumber || !policyType || !amount) {
      setError("All fields are required.");
      return;
    }

    if (amount <= 0) {
      setError("Amount must be a positive number.");
      return;
    }

    const policyData = {
      policyNumber,
      policyType,
      amount, // Add amount to the policy data
      userId, // Attach userId to link policy with user
    };

    try {
      // Send policy data to the backend to store in the database
      const response = await axios.post(`${API_BASE_URL}/policies`, policyData);

      // Handle successful policy creation
      setPolicyCreated(true);
      onPolicyCreated(response.data.id); // Pass policy ID back to parent

      console.log("Policy saved:", response.data);
    } catch (error) {
      // Handle error messages properly, check if 'error.response.data.detail' exists
      setError(error.response?.data?.detail || "Error saving policy.");
      console.error("Error saving policy:", error);
    }
  };

  // Ensure the amount is positive and update the state
  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (value === "" || value > 0) { // Allow empty string for deletion
      setAmount(value);
      setError(""); // Clear error when user starts typing a valid amount
    }
  };

  return (
    <div>
      <h2>Policy Form</h2>
      {policyCreated && <p>Policy created successfully ✅</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="policyNumber">Policy Number:</label>
          <input
            type="text"
            id="policyNumber"
            value={policyNumber}
            onChange={(e) => setPolicyNumber(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="policyType">Policy Type:</label>
          <input
            type="text"
            id="policyType"
            value={policyType}
            onChange={(e) => setPolicyType(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={handleAmountChange} // Use handleAmountChange to validate input
            required
          />
        </div>
        <button type="submit">Create Policy</button>
      </form>
    </div>
  );
};

export default PolicyForm;
