import './Home.css';
import { useState } from "react";
import ClaimForm from "../components/ClaimForm";
import ClaimList from "../components/ClaimList";
import UserForm from "../components/UserForm";
import PolicyForm from "../components/PolicyForm"; // Policy form

const Home = () => {
  const [userCreated, setUserCreated] = useState(false); // Track if the user is created
  const [policyCreated, setPolicyCreated] = useState(false); // Track if the policy is created
  const [userId, setUserId] = useState(null); // Track user ID after creation
  const [policyId, setPolicyId] = useState(null); // Track policy ID after creation

  const handleUserCreation = (id) => {
    setUserCreated(true);
    setUserId(id); // Save the user ID after creation
  };

  const handlePolicyCreation = (id) => {
    setPolicyCreated(true);
    setPolicyId(id); // Save the policy ID after creation
  };

  return (
    <div>
      <h1>Claims Management System</h1>

      {/* User Form */}
      <UserForm onUserCreated={handleUserCreation} />

      {/* Show Policy Form after user is created */}
      {userCreated && !policyCreated && (
        <PolicyForm userId={userId} onPolicyCreated={handlePolicyCreation} />
      )}

      {/* Show Claim Form after policy is created */}
      {policyCreated && <ClaimForm policyId={policyId} />}

      <ClaimList />
    </div>
  );
};

export default Home;

