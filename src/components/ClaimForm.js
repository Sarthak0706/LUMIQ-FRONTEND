import React, { useState, useEffect } from "react";
import axios from "axios";

const CreateClaimForm = () => {
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [amount, setAmount] = useState("");
  const [policyNumber, setPolicyNumber] = useState("");
  const [policyAmount, setPolicyAmount] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPolicyAmount = async () => {
      if (policyNumber) {
        try {
          const response = await axios.get(`http://localhost:8000/policies/${policyNumber}`);
          setPolicyAmount(response.data.amount);
          setError(""); // Clear error when policy is found
        } catch (err) {
          setPolicyAmount(null); // Reset policy amount if not found
          // setError("Policy not found.");
        }
      } else {
        setPolicyAmount(null); // Reset policy amount if no policy number is entered
        setError(""); // Clear error if no policy number
      }
    };

    fetchPolicyAmount();
  }, [policyNumber]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!description || !status || !amount || !policyNumber) {
      setError("All fields are required.");
      return;
    }

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setError("Please enter a valid amount.");
      return;
    }

    if (policyAmount !== null && parsedAmount > policyAmount) {
      setError("Claim amount cannot exceed policy amount.");
      return;
    }

    // Normalize status to lowercase to handle variations of "pending"
    const normalizedStatus = status.trim().toLowerCase();

    try {
      await axios.post("http://localhost:8000/claims", {
        description,
        status: normalizedStatus, // Send the normalized status
        amount: parsedAmount,
        policyNumber,
      });

      alert("Claim created successfully!");
      setDescription("");
      setStatus("");
      setAmount("");
      setPolicyNumber("");
    } catch (err) {
      console.error("Error creating claim:", err);
      setError("Failed to create claim.");
    }
  };

  const handleAmountChange = (e) => {
    let newAmount = e.target.value;
    // Only allow positive numbers and prevent negative values
    if (newAmount < 0) {
      newAmount = 0;
    }
    setAmount(newAmount);
  };

  return (
    <div>
      <h2>Create Claim</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Policy Number:</label>
          <input
            type="text"
            value={policyNumber}
            onChange={(e) => setPolicyNumber(e.target.value)}
            required
          />
        </div>
        {policyAmount !== null && <p>Policy Amount: ₹{policyAmount}</p>}
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
            onChange={handleAmountChange}  // Updated the amount change handler
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
