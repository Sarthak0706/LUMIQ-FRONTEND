import { useState } from "react";
import { createUser } from "../api";
import LogRocket from "logrocket";

const UserForm = ({ onUserCreated }) => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nameError, setNameError] = useState(""); // State to store name validation error

  const handleNameChange = (e) => {
    const newName = e.target.value;
    if (/^[A-Za-z\s]*$/.test(newName)) {
      setName(newName);
      setNameError(""); // Clear error if valid
    } else {
      setNameError("Name must contain only letters and spaces.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (nameError) {
      alert("Please fix the errors before submitting.");
      return;
    }

    LogRocket.track("submit-button-clicked", {
      id,
      name,
      email,
      action: "User Form Submission",
    });

    try {
      await createUser({ id, name, email }); // Ensure 'id' is included
      alert("User created successfully!");
      setId("");
      setName("");
      setEmail("");
      onUserCreated();
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
          onChange={handleNameChange}
          required
        />
        {nameError && <p style={{ color: "red" }}>{nameError}</p>}
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
