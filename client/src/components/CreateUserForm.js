import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";

function CreateUserForm() {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [managerID, setManagerID] = useState("");
  const [role, setRole] = useState(""); // State for the selected role
  const [salary, setSalary] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/user/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
        name,
        phoneNumber,
        managerID,
        role,
        salary,
        location,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("token", data.token);
      navigate("/");
    } else {
      console.error(data.message);
    }
  };

  return (
<<<<<<< HEAD
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={4}>
          <Card className="shadow p-3 mb-5 bg-white rounded">
            <Card.Body>
              <h2 className="fw-bold text-center mb-2 text-uppercase">
                Create User
              </h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    required
                    className="shadow-sm"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                    className="shadow-sm"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                    className="shadow-sm"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Phone Number"
                    required
                    className="shadow-sm"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    value={managerID}
                    onChange={(e) => setManagerID(e.target.value)}
                    placeholder="Manager ID"
                    required
                    className="shadow-sm"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="shadow-sm"
                  >
                    <option value="">Select Job Role</option>
                    <option value="Manager">Manager</option>
                    <option value="Employee">Employee</option>
                    <option value="Hr">HR</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                    placeholder="Salary"
                    required
                    className="shadow-sm"
                  />
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="shadow-sm"
                  >
                    <option value="">Select Location</option>
                    <option value="New York City">New York City</option>
                    <option value="Los Angeles">Los Angeles</option>
                    <option value="Chicago">Chicago</option>
                    <option value="Houston">Houston</option>
                    <option value="Phoenix">Phoenix</option>
                  </Form.Select>
                </Form.Group>
                <Button
                  variant="primary"
                  size="lg"
                  type="submit"
                  block
                  className="shadow-sm"
                >
                  Create User
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
=======
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
>>>>>>> 31d3765883c484abb937ba4e7f71e1d615f6f3fa
  );
}

export default CreateUserForm;
