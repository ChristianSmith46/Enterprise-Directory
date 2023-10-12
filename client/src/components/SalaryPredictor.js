import React, { useState } from "react";

function SalaryPredictor() {
  const [role, setRole] = useState("");
  const [location, setLocation] = useState("");
  const [predictedSalary, setPredictedSalary] = useState("");

  const getPredictedSalary = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/predictsalary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role, location }),
      });
      const data = await response.json();
      setPredictedSalary(data.salary);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        placeholder="Job Role"
      />
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Location"
      />
      <button onClick={getPredictedSalary}>Predict Salary</button>
      {predictedSalary && <p>Predicted Salary: {predictedSalary}</p>}
    </div>
  );
}
