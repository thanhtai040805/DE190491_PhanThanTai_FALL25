import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUserState } from "../contexts/UserContext";
import { Card, Button } from "react-bootstrap";

const ViewUserDetail = () => {
    const { id } = useParams();
    const { users } = useUserState();
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const foundUser = users.find((u) => u.id === id);
        setUser(foundUser);
    }, [id, users]);
    return (
        <div className="container">
            <h1 className="text-center mb-4">View User Detail</h1>
            <Card className="mb-4 shadow-sm">
                <Card.Body>
                    <img src={user?.avatar} alt={user?.username} className="rounded-circle mb-3" style={{ width: "100px", height: "100px" }} />
                    <Card.Title>{user?.username}</Card.Title>
                    <Card.Text>{user?.fullName}</Card.Text>
                    <Card.Text>{user?.role}</Card.Text>
                    <Card.Text>{user?.status}</Card.Text>
                </Card.Body>
            </Card>
            <Button variant="primary" onClick={() => navigate("/users")}>Back</Button>
        </div>
    );
};

export default ViewUserDetail;  