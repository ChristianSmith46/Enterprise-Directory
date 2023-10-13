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

function SalaryPredictor() {
  const [role, setRole] = useState("");
  const [location, setLocation] = useState("");
  const [predictedSalary, setPredictedSalary] = useState("");

  const getPredictedSalary = async () => {
    try {
      const response = await fetch("/api/predictsalary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role, location }),
      });
      const data = await response.json();
      setPredictedSalary(data.prediction);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="shadow-lg p-3 mb-5 bg-white rounded">
            <Card.Body>
              <h5 className="card-title text-center mb-4">Predict Salary</h5>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Job Role</Form.Label>
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
                  <Form.Label>Location</Form.Label>
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
                  block
                  onClick={getPredictedSalary}
                  className="shadow-sm"
                >
                  Predict Salary
                </Button>
                {predictedSalary && (
                  <Alert variant="success" className="mt-3 shadow-sm">
                    Predicted Salary: {"$" + Math.round(predictedSalary)}
                  </Alert>
                )}
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default SalaryPredictor;
