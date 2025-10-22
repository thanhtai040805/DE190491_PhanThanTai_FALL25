// LoginForm component is used to render a login form with username and password fields, including validation and error handling.
import { useReducer } from "react";
import {
  Form,
  Button,
  Card,
  Container,
  Row,
  Col,
  Modal,
} from "react-bootstrap";
import { ModalComponent } from "./ModalComponent";

const initialState = {
  username: "",
  password: "",
  errors: {},
  showModal: false,
};

const errorMessages = {
  username: "Username is required",
  password: "Password is required",
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_FIELD": {
      const { field, value } = action;
      const trimmedValue = value.trim();
      let nextErrors = state.errors;

      if (trimmedValue === "") {
        nextErrors = { ...state.errors, [field]: errorMessages[field] };
      } else if (state.errors[field]) {
        const { [field]: _removed, ...rest } = state.errors;
        nextErrors = rest;
      }

      return {
        ...state,
        [field]: value,
        errors: nextErrors,
      };
    }
    case "SET_ERRORS":
      return {
        ...state,
        errors: action.errors,
      };
    case "SUBMIT_SUCCESS":
      return {
        ...state,
        errors: {},
        showModal: true,
      };
    case "CLOSE_MODAL":
      return { ...initialState };
    default:
      return state;
  }
}

function LoginForm({ onSubmit }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { username, password, errors, showModal } = state;

  const handleFieldChange = (field) => (e) => {
    dispatch({
      type: "SET_FIELD",
      field,
      value: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Ngăn chặn reload trang
    const newErrors = {};
    if (username.trim() === "") {
      newErrors.username = "Username is required";
    }
    if (password.trim() === "") {
      newErrors.password = "Password is required";
    }
    if (Object.keys(newErrors).length > 0) {
      dispatch({ type: "SET_ERRORS", errors: newErrors });
      return;
    }
    dispatch({ type: "SUBMIT_SUCCESS" });
    if (onSubmit) {
      onSubmit({ username, password });
    }
  };

  const handleCloseModal = () => {
    dispatch({ type: "CLOSE_MODAL" });
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Card>
            <Card.Header>
              <h3 className="text-center">Login</h3>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="username" className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    value={username}
                    onChange={handleFieldChange("username")}
                    isInvalid={!!errors.username}
                    placeholder="Enter username"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.username}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="password" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={handleFieldChange("password")}
                    isInvalid={!!errors.password}
                    placeholder="Enter password"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100">
                  Login
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <ModalComponent
        show={showModal}
        onHide={handleCloseModal}
        title="Login Successful"
        form={{ username, email: "", password }}
      />
      {/* <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Login Successful</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Welcome, {username}!</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal> */}
    </Container>
  );
}

export default LoginForm;
