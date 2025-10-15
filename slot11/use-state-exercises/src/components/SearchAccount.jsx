//SearchAccount.jsx use State to create a search Account by username field and a search button, display result in a list of accounts with all fields , hiển thị toàn bộ accounts dưới dạng card.
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";

const data = [
  { id: 1, username: "john_doe", password: "password123" , avatar: "https://i.pravatar.cc/150?img=1"},
    { id: 2, username: "jane_smith", password: "securepass" , avatar: "https://i.pravatar.cc/150?img=2"},
    { id: 3, username: "alice_jones", password: "mypassword" , avatar: "https://i.pravatar.cc/150?img=3"},
    { id: 4, username: "bob_brown", password: "letmein" , avatar: "https://i.pravatar.cc/150?img=4"},
    { id: 5, username: "charlie_black", password: "qwerty" , avatar: "https://i.pravatar.cc/150?img=5"}
];

export const SearchAccount = () => {
    const [username, setUsername] = useState("");
    const [errors, setErrors] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    //Xử lý thay đổi input
    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
        if (e.target.value.trim() === "") {
            setErrors("Username is required");
        } else {
            setErrors("");
        }
    }
    //Xử lý submit form
    const handleSubmit = (e) => {
        e.preventDefault();
        if (username.trim() === "") {
            setErrors("Username is required");
            setResult(null);
            return;
        }
        setLoading(true);
        setErrors("");
        setResult(null);
        //Search in data
        setTimeout(() => {
            const account = data.find(acc => acc.username.toLowerCase() === username.toLowerCase());
            if (account) {
                setResult(account);
            }
            else {
                setErrors("Account not found");
            }
            setLoading(false);
        }, 1000);
    }
    return (
      <div style={{ padding: "20px", border: "1px solid #ccc", maxWidth: "600px" }} className="mx-auto">
        <h2>Tìm Kiếm Tài Khoản</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={handleUsernameChange}
              isInvalid={!!errors}
            />
            <Form.Control.Feedback type="invalid">
              {errors}
            </Form.Control.Feedback>
          </Form.Group>
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className="me-2"
                />
                Searching...
              </>
            ) : (
              "Search"
            )}
          </Button>
        </Form>

        <ul style={{ paddingLeft: 0, listStyle: "none", margin: 0 }}>
          {data.map((item) => (
            <li
              key={item.id}
              style={{
                background: "#e3f2fd",
                marginBottom: 10,
                padding: "10px 14px",
                borderRadius: "7px",
                fontSize: 16,
                color: "#333",
                boxShadow: "0 1px 4px rgba(33,150,243,0.07)",
              }}
            >
                <span style={{ fontWeight: 600 }}>{item.username}</span>
                <span style={{ color: "#1976d2" }}> (ID: {item.id})</span>
                <br />
                <span>Password: {item.password}</span>
                <img src={item.avatar} alt="avatar" style={{width: "50px", height: "50px", borderRadius: "50%", marginTop: "5px"}}/>
            </li>
          ))}
        </ul>

        <div style={{ marginTop: "20px" }}>
          {result && (
            <Alert variant="success">
              <Alert.Heading>Account Found!</Alert.Heading>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <strong>ID:</strong> {result.id}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Username:</strong> {result.username}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Password:</strong> {result.password}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Avatar:</strong> <br />
                  <img src={result.avatar} alt="avatar" />
                </ListGroup.Item>
              </ListGroup>
            </Alert>
          )}
        </div>
      </div>
    );
}