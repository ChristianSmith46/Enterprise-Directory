import React, { useState } from "react";
import {
  Button,
  Form,
  Container,
  Row,
  Col,
  Card,
  Alert,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
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
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={4}>
          <Card className="shadow p-3 mb-5 bg-white rounded">
            <Card.Body>
              <h2 className="fw-bold text-center mb-2 text-uppercase">Login</h2>
              <p className="text-center text-muted mb-4">
                Please enter your login and password!
              </p>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="shadow-sm"
                  />
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="shadow-sm"
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  size="lg"
                  type="submit"
                  block
                  className="shadow-sm"
                >
                  Login
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginForm;
