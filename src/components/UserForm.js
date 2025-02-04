import { useState } from "react";
import { createUser } from "../api";
import LogRocket from "logrocket"; // Make sure you import LogRocket

const UserForm = ({ onUserCreated }) => { // Receive the callback
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // LogRocket custom event tracking
    LogRocket.track('submit-button-clicked', {
      id,    // Track the id
      name,  // Track the name
      email, // Track the email
      action: 'User Form Submission'
    });

    try {
      await createUser({ id, name, email });
      alert("User created successfully!");
      setId("");
      setName("");
      setEmail("");
      onUserCreated(); // Notify Home that user is created
    } catch (error) {
      alert(error.response?.data?.detail || "Error creating user");
    }
  };

  return (
    <div>
      <h2>Create User</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UserForm;

