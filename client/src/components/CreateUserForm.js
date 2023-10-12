import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateUserForm() {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [managerID, setManagerID] = useState("");
  const [role, setRole] = useState("");
  const [salary, setSalary] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/user/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name, phoneNumber, managerID, role, salary, location }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("token", data.token);
      navigate('/');
    } else {
      console.error(data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="name"
        required
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <input
        type="phoneNumber"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        placeholder="phoneNumber"
        required
      />
      <input
        type="managerID"
        value={managerID}
        onChange={(e) => setManagerID(e.target.value)}
        placeholder="managerID"
        required
      />
      <input
        type="role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        placeholder="role"
        required
      />
      <input
        type="salary"
        value={salary}
        onChange={(e) => setSalary(e.target.value)}
        placeholder="salary"
        required
      />
      <input
        type="location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="location"
        required
      />
      <button type="submit">Log in</button>
    </form>
  );
}

export default CreateUserForm;
