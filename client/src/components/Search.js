import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Button,
    Form
} from "react-bootstrap";

export default function Search({ setEmployees }) {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    useEffect(() => {
        let token = localStorage.getItem('token');
        if (!token) navigate('/login');
    }, []);
    function handleSubmit(e) {
        e.preventDefault();
        let token = localStorage.getItem('token');
        if (!token) return navigate('/login');
        fetch(`/api/user/lookup?name=${name}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => response.json())
            .then((data) => setEmployees(data));
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Label>Search Name:</Form.Label>
                <Form.Control
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
                Search
            </Button>
        </Form>
    );
}