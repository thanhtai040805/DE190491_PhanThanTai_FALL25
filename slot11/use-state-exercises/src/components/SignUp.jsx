import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import "bootstrap/dist/css/bootstrap.min.css";

// ✅ Regex kiểm tra email
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const isEmailValid = (email) => emailRegex.test(email);

// ✅ Password ≥8 ký tự, có chữ hoa, chữ thường, chữ số, ký tự đặc biệt
const isPasswordValid = (password) => {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(password);
};

// ✅ Confirm password phải giống password
const isConfirmPasswordValid = (password, confirmPassword) =>
  password === confirmPassword;

// ✅ Username ≥3 ký tự, không có khoảng trắng
const isUsernameValid = (username) =>
  username.length >= 3 && !/\s/.test(username);

export const SignUp = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [showToast, setShowToast] = useState(false); // 🔹 Khai báo Toast
  const [showModal, setShowModal] = useState(false); // 🔹 Khai báo Modal

  // ✅ Kiểm tra form hợp lệ
  const isFormValid =
    isUsernameValid(user.username) &&
    isEmailValid(user.email) &&
    isPasswordValid(user.password) &&
    isConfirmPasswordValid(user.password, user.confirmPassword);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedUser = { ...user, [name]: value };
    setUser(updatedUser);

    let error = "";

    // Kiểm tra từng trường cụ thể
    if (name === "username" && !isUsernameValid(value)) {
      error = "Username must be at least 3 characters and contain no spaces";
    } else if (name === "email" && !isEmailValid(value)) {
      error = "Invalid email format";
    } else if (name === "password" && !isPasswordValid(value)) {
      error =
        "Password must be at least 8 characters, include uppercase, lowercase, number, and special character";
    } else if (name === "confirmPassword") {
      if (!isConfirmPasswordValid(updatedUser.password, value)) {
        error = "Passwords do not match";
      }
    }

    setErrors((prev) => ({ ...prev, [name]: error }));

    // 🔹 Ngoài ra: Nếu confirmPassword đang sai, nhưng người dùng sửa lại password cho khớp => reset lỗi confirmPassword
    if (name === "password" && errors.confirmPassword) {
      if (isConfirmPasswordValid(value, updatedUser.confirmPassword)) {
        setErrors((prev) => ({ ...prev, confirmPassword: "" }));
      }
    }
  };

  // ✅ Xử lý khi Submit
  const handleSubmit = (e) => {
    e.preventDefault(); // Không reload trang
    const newErrors = {};

    if (!isUsernameValid(user.username))
      newErrors.username =
        "Username must be at least 3 characters and contain no spaces";
    if (!isEmailValid(user.email)) newErrors.email = "Invalid email format";
    if (!isPasswordValid(user.password))
      newErrors.password =
        "Password must be at least 8 characters, include uppercase, lowercase, number, and special character";
    if (!isConfirmPasswordValid(user.password, user.confirmPassword))
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setShowToast(true);
      setShowModal(true);
    }
  };

  // ✅ Reset form
  const handleCancel = () => {
    setUser({ username: "", email: "", password: "", confirmPassword: "" });
    setErrors({});
  };

  // ✅ Đóng modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div
        style={{
          maxWidth: 420,
          margin: "40px auto",
          padding: "24px",
          borderRadius: "12px",
          boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
          background: "#f7fafd",
        }}
      >
        <h3 style={{ textAlign: "center", color: "#1976d2", marginBottom: 24 }}>
          Sign Up Form
        </h3>

        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="username" className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={user.username}
              onChange={handleChange}
              isInvalid={!!errors.username}
              placeholder="Enter username"
            />
            <Form.Control.Feedback type="invalid">
              {errors.username}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="email" className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              isInvalid={!!errors.email}
              placeholder="Enter email"
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="password" className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              isInvalid={!!errors.password}
              placeholder="Enter password"
            />
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="confirmPassword" className="mb-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              name="confirmPassword"
              value={user.confirmPassword}
              onChange={handleChange}
              isInvalid={!!errors.confirmPassword}
              placeholder="Confirm password"
            />
            <Form.Control.Feedback type="invalid">
              {errors.confirmPassword}
            </Form.Control.Feedback>
          </Form.Group>

          <div className="d-flex gap-2">
            <Button
              type="submit"
              variant="primary"
              className="w-100"
              disabled={!isFormValid}
            >
              Submit
            </Button>
            <Button
              type="button"
              variant="secondary"
              className="w-100"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </div>
        </Form>
      </div>

      {/* ✅ Toast hiển thị khi submit thành công */}
      <ToastContainer
        position="top-end"
        className="p-3"
        style={{
          position: "fixed", // 🔥 cần thiết để thoát khỏi layout cha
          top: 20, // vị trí trên
          right: 20, // vị trí phải
          zIndex: 5000, // 🔥 cao hơn modal backdrop (1050)
        }}
      >
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={3000}
          autohide
          bg="success"
        >
          <Toast.Body className="text-white fw-semibold text-center">
            ✅ Submitted successfully!
          </Toast.Body>
        </Toast>
      </ToastContainer>

      {/* ✅ Modal hiển thị thông tin đã submit */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Submitted Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card className="shadow-sm border-0">
            <Card.Body>
              <h5 className="text-primary">User Info</h5>
              <p>
                <strong>Username:</strong> {user.username}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Password:</strong> ••••••••
              </p>
              <p className="text-success mb-0">Form submitted successfully!</p>
            </Card.Body>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SignUp;
