import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

function EmployeeDirectory() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    let token = localStorage.getItem('token');
    if(!token) return navigate('/login');
    fetch("/api/user/salaries", {
      method: "GET",
      headers: {
        "Authorization": token,
      }
    }) // replace with your server's address and route
      .then((response) => response.json())
      .then((data) => setEmployees(data.directReports));
  }, [navigate]);

  return (
    <div>
      {employees.length > 0 && employees.map((employee) => (
        <div key={employee._id}>
          <h2>{employee.name}</h2>
          <p>Phone Number: {employee.phoneNumber}</p>
          <p>Role: {employee.role}</p>
          <p>Location: {employee.location}</p>
          <p>Salary: {employee.salary}</p>
          <p>Email: {employee.email}</p>
          <p>Manager ID: {employee.managerID}</p>
        </div>
      ))}
    </div>
  );
}

export default EmployeeDirectory;
