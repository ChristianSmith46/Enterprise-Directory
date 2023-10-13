import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Badge } from "react-bootstrap";
import Search from "./Search";

function EmployeeDirectory() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (!token) return navigate("/login");
    fetch("/api/user/salaries", {
      method: "GET",
      headers: {
        Authorization: token,
      },
    })
      .then((response) => response.json())
      .then((data) => setEmployees(data.directReports));
  }, [navigate]);

  return (
    <Container className="py-5">
      <Search setEmployees={setEmployees} />
      {employees.length > 0 &&
        employees.map((employee) => (
          <Row key={employee._id} className="mb-4">
            <Col xs={12}>
              <Card className="border-0 rounded-lg shadow">
                <Card.Body className="p-3">
                  <h2 className="text-center mb-3">{employee.name}</h2>
                  <Row className="text-muted">
                    <Col xs={6}>
                      <Card bg="light">
                        <Card.Body>
                          <Badge bg="primary" className="me-2">
                            Role
                          </Badge>{" "}
                          {employee.role}
                        </Card.Body>
                      </Card>
                      <Card bg="light" className="mt-3">
                        <Card.Body>
                          <Badge bg="info" className="me-2">
                            Location
                          </Badge>{" "}
                          {employee.location}
                        </Card.Body>
                      </Card>
                      <Card bg="light" className="mt-3">
                        <Card.Body>
                          <Badge bg="secondary" className="me-2">
                            Manager ID
                          </Badge>{" "}
                          {employee.managerID}
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col xs={6}>
                      <Card bg="light">
                        <Card.Body>
                          <Badge bg="success" className="me-2">
                            Phone Number
                          </Badge>{" "}
                          {employee.phoneNumber}
                        </Card.Body>
                      </Card>
                      <Card bg="light" className="mt-3">
                        <Card.Body>
                          <Badge bg="warning" className="me-2">
                            Salary
                          </Badge>{" "}
                          {"$" +
                            Math.round(employee.salary).toLocaleString("en-US")}
                        </Card.Body>
                      </Card>
                      <Card bg="light" className="mt-3">
                        <Card.Body>
                          <Badge bg="primary" className="me-2">
                            Email
                          </Badge>{" "}
                          {employee.email}
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        ))}
    </Container>
  );
}

export default EmployeeDirectory;
