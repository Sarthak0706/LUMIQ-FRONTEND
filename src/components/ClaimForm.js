
import React, { useState } from "react";
import axios from "axios";

const CreateClaimForm = () => {
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation for empty fields
    if (!description || !status || !amount) {
      setError("All fields are required.");
      return;
    }

    // Check if amount is a valid number
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount)) {
      setError("Please enter a valid amount.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/claims", {
        description,
        status,
        amount: parsedAmount, // Ensure it's a valid float
      });

      // Handle successful claim creation
      console.log("Claim created:", response.data);
      alert("Claim created successfully!");
      setDescription("");
      setStatus("");
      setAmount(""); // Clear amount field after success
    } catch (err) {
      console.error("Error creating claim:", err);
      setError("Failed to create claim.");
    }
  };

  return (
    <div>
      <h2>Create Claim</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Description:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Status:</label>
          <input
            type="text"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Create Claim</button>
      </form>
    </div>
  );
};

export default CreateClaimForm;
