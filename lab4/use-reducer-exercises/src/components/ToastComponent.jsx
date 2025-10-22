// Tạo 1 ToastComponet để sử dụng chung cho LoginForm và SignUpForm
import React from "react";
import { Toast, ToastContainer } from "react-bootstrap";
export function ToastComponent({ show, onClose, message }) {
  return (
    <ToastContainer position="top-end" className="p-3">
      <Toast show={show} onClose={onClose} delay={3000} autohide bg="success">
        <Toast.Header>
          <strong className="me-auto">Notification</strong>
        </Toast.Header>
        <Toast.Body className="text-white">{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}