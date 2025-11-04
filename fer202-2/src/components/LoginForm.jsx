import React, { useReducer } from "react";
import {
  Form,
  Button,
  Card,
  Container,
  Row,
  Col,
  Alert,
  Spinner,
} from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { loginFormReducer, initialFormState } from "../reducers/LoginFormReducer";
import { useNavigate } from "react-router-dom";
import { ConfirmModal } from "./ConfirmModal";

function LoginForm() {
  const navigate = useNavigate();
  // 3. Sử dụng useReducer cho form state
  const [formState, dispatch] = useReducer(loginFormReducer, initialFormState);
  // 4. Sử dụng AuthContext
  const { login, loading, error, clearError, user } = useAuth();

  // 5. Validation helpers
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmail = (v) => v.includes("@");

  // 6. Xử lý thay đổi input
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Cập nhật giá trị field
    dispatch({ type: "SET_FIELD", field: name, value });
    // Clear auth error khi user nhập
    clearError();
    // Validation real-time
    if (name === "identifier") {
      if (!value.trim()) {
        dispatch({
          type: "SET_ERROR",
          field: name,
          message: "Username or Email is required.",
        });
      } else if (isEmail(value) && !emailRe.test(value)) {
        dispatch({
          type: "SET_ERROR",
          field: name,
          message: "Email is invalid format.",
        });
      } else {
        dispatch({ type: "CLEAR_ERROR", field: name });
      }
    }

    if (name === "password") {
      if (!value.trim()) {
        dispatch({
          type: "SET_ERROR",
          field: name,
          message: "Password is required.",
        });
      } else {
        dispatch({ type: "CLEAR_ERROR", field: name });
      }
    }
  };

  // 7. Validation form
  const validateForm = () => {
    const errors = {};
    if (!formState.identifier.trim()) {
      errors.identifier = "Username or Email is required.";
    } else if (
      isEmail(formState.identifier) &&
      !emailRe.test(formState.identifier)
    ) {
      errors.identifier = "Email is invalid format.";
    }
    if (!formState.password.trim()) {
      errors.password = "Password is required.";
    }
    return errors;
  };

  // 8. Xử lý submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();
    // Validate form
    const validationErrors = validateForm();
    dispatch({ type: "SET_ERRORS", errors: validationErrors });
    if (Object.keys(validationErrors).length > 0) {
      return;
    }
    try {
      // Gọi login từ AuthContext
      const result = await login(
        formState.identifier.trim(),
        formState.password
      );
      if (result.ok) {
        // Hiển thị modal thành công
        dispatch({ type: "SHOW_SUCCESS_MODAL" });
        setTimeout(() => {
          navigate("/motobikes");
        }, 2000);
      }
      // Lỗi sẽ được hiển thị qua AuthContext error
    } catch (err) {
      console.error("Login error:", err);
    }
  };
  // 9. Xử lý reset form
  const handleReset = () => {
    dispatch({ type: "RESET_FORM" });
    clearError();
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <Card>
            <Card.Header>
              <h3 className="text-center mb-0">Login</h3>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit} noValidate>
                <Form.Group controlId="identifier" className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="identifier"
                    value={formState.identifier}
                    onChange={handleChange}
                    isInvalid={!!formState.errors.identifier}
                    placeholder="Enter username"
                    disabled={loading}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formState.errors.identifier}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="password" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formState.password}
                    onChange={handleChange}
                    isInvalid={!!formState.errors.password}
                    placeholder="Enter password"
                    disabled={loading}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formState.errors.password}
                  </Form.Control.Feedback>
                </Form.Group>

                <div style={{ display: "flex", gap: 8 }}>
                  <Button
                    variant="primary"
                    type="submit"
                    style={{ flex: 1 }}
                    disabled={loading}
                  >
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
                        Logging in...
                      </>
                    ) : (
                      "Login"
                    )}
                  </Button>
                  <Button
                    variant="secondary"
                    type="button"
                    style={{ flex: 1 }}
                    onClick={handleReset}
                    disabled={loading}
                  >
                    Reset
                  </Button>
                </div>

                {/* Hiển thị lỗi từ AuthContext */}
                {error && (
                  <Alert
                    variant="danger"
                    className="mt-3"
                    onClose={clearError}
                    dismissible
                  >
                    {error}
                  </Alert>
                )}
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {/* Modal thông báo thành công */}
      <ConfirmModal
        show={formState.showSuccessModal}
        title="Login Successful"
        message={`Welcome, ${user?.username} login successful!`}
      />
    </Container>
  );
}

export default LoginForm;
