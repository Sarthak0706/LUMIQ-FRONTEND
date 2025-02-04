import { useState } from "react";

const PolicyForm = ({ userId, onPolicyCreated }) => {
  const [policyNumber, setPolicyNumber] = useState("");
  const [policyType, setPolicyType] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Assuming the policy creation API requires userId as a reference
      console.log("Creating policy for user ID: ", userId);
      
      // Call API to create policy and associate with user
      const policyData = { policyNumber, policyType, userId };
      console.log("Policy Created: ", policyData);

      // Assuming the response contains the created policy ID
      const policyId = "someGeneratedPolicyId"; // Replace with actual API response

      onPolicyCreated(policyId); // Pass the policy ID back to the parent component

      alert("Policy created successfully!");
      setPolicyNumber("");
      setPolicyType("");
    } catch (error) {
      alert("Error creating policy");
    }
  };

  return (
    <div>
      <h2>Create Policy</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Policy Number"
          value={policyNumber}
          onChange={(e) => setPolicyNumber(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Policy Type"
          value={policyType}
          onChange={(e) => setPolicyType(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PolicyForm;
