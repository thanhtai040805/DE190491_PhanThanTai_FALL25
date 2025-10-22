import React, { useReducer, useMemo } from "react";
import {
  Form,
  Button,
  Card,
  Container,
  Row,
  Col,
  Modal,
  Toast,
} from "react-bootstrap";
import { ModalComponent } from "./ModalComponent";

// =====================
// 🔹 Regex Helpers
// =====================
const isEmail = (v) => /\S+@\S+\.[A-Za-z]{2,}/.test(v);
const isUsername = (v) => /^[A-Za-z0-9._]{3,}$/.test(v.trim());
const isStrongPassword = (v) =>
  /[A-Z]/.test(v) && // có chữ hoa
  /[a-z]/.test(v) && // có chữ thường
  /\d/.test(v) && // có số
  /[^A-Za-z0-9]/.test(v) && // có ký tự đặc biệt
  v.length >= 8; // độ dài

// =====================
// 🔹 State Reducer
// =====================
const initialState = {
  form: { username: "", email: "", password: "", confirm: "" },
  errors: {},
  showModal: false,
  showToast: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_FIELD":
      return {
        ...state,
        form: { ...state.form, [action.field]: action.value },
      };
    case "SET_ERROR":
      return {
        ...state,
        errors: { ...state.errors, [action.field]: action.error },
      };
    case "SET_ALL_ERRORS":
      return { ...state, errors: action.errors };
    case "SHOW_MODAL":
      return { ...state, showModal: true };
    case "HIDE_MODAL":
      return { ...state, showModal: false };
    case "SHOW_TOAST":
      return { ...state, showToast: true };
    case "HIDE_TOAST":
      return { ...state, showToast: false };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

// =====================
// 🔹 Validation Logic
// =====================
const validate = (field, value, form) => {
  switch (field) {
    case "username":
      if (!value.trim()) return "Username is required";
      if (!isUsername(value))
        return "≥ 3 chars, letters/numbers/._ only, no spaces";
      return "";
    case "email":
      if (!value.trim()) return "Email is required";
      if (!isEmail(value)) return "Invalid email format";
      return "";
    case "password":
      if (!value) return "Password is required";
      if (!isStrongPassword(value))
        return "≥8 chars, upper, lower, number, special";
      return "";
    case "confirm":
      if (!value) return "Please confirm password";
      if (value !== form.password) return "Passwords do not match";
      return "";
    default:
      return "";
  }
};

export default function SignUpForm() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { form, errors, showModal, showToast } = state;

  // =====================
  // 🔹 Memoized form error checking
  // =====================
  const formErrors = useMemo(() => {
    const e = {};
    Object.keys(form).forEach((field) => {
      const err = validate(field, form[field], form);
      if (err) e[field] = err;
    });
    return e;
  }, [form]);

  const isValid = Object.keys(formErrors).length === 0;

  // =====================
  // 🔹 Handle input change
  // =====================
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "SET_FIELD", field: name, value });
    const error = validate(name, value, { ...form, [name]: value });
    dispatch({ type: "SET_ERROR", field: name, error });
  };

  // =====================
  // 🔹 Handle submit
  // =====================
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.keys(form).forEach((field) => {
      const err = validate(field, form[field], form);
      if (err) newErrors[field] = err;
    });

    dispatch({ type: "SET_ALL_ERRORS", errors: newErrors });

    if (Object.keys(newErrors).length === 0) {
      dispatch({ type: "SHOW_TOAST" });
      dispatch({ type: "SHOW_MODAL" });
    }
  };

  // =====================
  // 🔹 Handle reset
  // =====================
  const handleCancel = () => {
    dispatch({ type: "RESET" });
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={7}>
          <Card>
            <Card.Header>
              <h3 className="text-center">Sign Up</h3>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                {/* Username */}
                <Form.Group controlId="username" className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    isInvalid={!!errors.username}
                    placeholder="Enter username"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.username}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Email */}
                <Form.Group controlId="email" className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    isInvalid={!!errors.email}
                    placeholder="Enter email"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Password */}
                <Form.Group controlId="password" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    isInvalid={!!errors.password}
                    placeholder="Enter password"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Confirm Password */}
                <Form.Group controlId="confirm" className="mb-3">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="confirm"
                    value={form.confirm}
                    onChange={handleChange}
                    isInvalid={!!errors.confirm}
                    placeholder="Confirm password"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.confirm}
                  </Form.Control.Feedback>
                </Form.Group>

                <div className="d-flex gap-2">
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={!isValid}
                    className="w-100"
                  >
                    Submit
                  </Button>
                  <Button
                    variant="outline-secondary"
                    type="button"
                    onClick={handleCancel}
                    className="w-100"
                  >
                    Cancel
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Toast */}
      <Toast
        show={showToast}
        onClose={() => dispatch({ type: "HIDE_TOAST" })}
        delay={2000}
        autohide
        style={{
          position: "fixed",
          top: 20,
          right: 20,
          minWidth: 220,
          zIndex: 9999,
        }}
      >
        <Toast.Header>
          <strong className="me-auto text-success">Success</strong>
        </Toast.Header>
        <Toast.Body>Submitted successfully!</Toast.Body>
      </Toast>

      {/* Modal */}
      <ModalComponent
        show={showModal}
        onHide={handleCancel}
        title="Sign Up Info"
        form={form}
      />
      {/* <Modal show={showModal} onHide={handleCancel} centered>
        <Modal.Header closeButton>
          <Modal.Title>Sign Up Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card>
            <Card.Body>
              <p>
                <strong>Username:</strong> {form.username}
              </p>
              <p>
                <strong>Email:</strong> {form.email}
              </p>
              <p>
                <strong>Password:</strong> {form.password}
              </p>
            </Card.Body>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancel}>
            Close
          </Button>
        </Modal.Footer>
      </Modal> */}
    </Container>
  );
}
