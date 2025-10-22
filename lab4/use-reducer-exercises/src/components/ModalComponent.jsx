// Tạo 1 ModalComponent sử dụng useReducer để dùng chung cho LoginForm và SignUpForm và hiển thị thông tin của form
import React from "react";
import { Modal, Button, Card } from "react-bootstrap";

export function ModalComponent({ show, onHide, title, form }) {
  return (
    <>
      {/* Modal */}
      <Modal show={show} onHide={onHide} centered>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
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
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );}
