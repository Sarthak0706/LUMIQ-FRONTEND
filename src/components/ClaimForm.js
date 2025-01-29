import { useState } from "react";
import { createClaim } from "../api";

const ClaimForm = () => {
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createClaim({ description, status });
      alert("Claim created successfully!");
      setDescription("");
      setStatus("");
    } catch (error) {
      alert(error.response?.data?.detail || "Error creating claim");
    }
  };

  return (
    <div>
      <h2>Create Claim</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ClaimForm;
