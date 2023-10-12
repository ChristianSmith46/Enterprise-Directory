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
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Full Name"
        required
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
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
        type="text"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        placeholder="Phone Number"
        required
      />
      <input
        type="text"
        value={managerID}
        onChange={(e) => setManagerID(e.target.value)}
        placeholder="Manager ID"
        required
      />
      <input
        type="text"
        value={salary}
        onChange={(e) => setSalary(e.target.value)}
        placeholder="Salary"
        required
      />
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="">Select Job Role</option>
        <option value="Manager">Manager</option>
        <option value="Employee">Employee</option>
        <option value="Hr">HR</option>
      </select>
      <select value={location} onChange={(e) => setLocation(e.target.value)}>
        <option value="">Select Location</option>
        <option value="New York City">New York City</option>
        <option value="Los Angeles">Los Angeles</option>
        <option value="Chicago">Chicago</option>
        <option value="Houston">Houston</option>
        <option value="Phoenix">Phoenix</option>
      </select>
      <button type="submit">Log in</button>
    </form>
  );
}

export default CreateUserForm;
