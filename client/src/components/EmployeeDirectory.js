import React, { useState, useEffect } from "react";

function EmployeeDirectory() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/user") // replace with your server's address and route
      .then((response) => response.json())
      .then((data) => setEmployees(data));
  }, []);

  return (
    <div>
      {employees.map((employee) => (
        <div key={employee._id}>
          <h2>{employee.name}</h2>
          <p>Phone Number: {employee.phoneNumber}</p>
          <p>Role ID: {employee.roleID}</p>
          <p>Location ID: {employee.locationID}</p>
          <p>Salary: {employee.salary}</p>
          <p>Email: {employee.email}</p>
          <p>Password: {employee.password}</p>{" "}
          <p>Manager ID: {employee.managerID}</p>
        </div>
      ))}
    </div>
  );
}

export default EmployeeDirectory;
