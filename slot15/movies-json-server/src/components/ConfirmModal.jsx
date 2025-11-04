// Tạo 1 ModalComponent sử dụng useReducer để dùng chung cho LoginForm và SignUpForm và hiển thị thông tin của form
import React from "react";
import { Modal, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export function ConfirmModal({ show, onHide, title, message }) {
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
                <strong /> {message}
              </p>
            </Card.Body>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary">
            <Link to="/movie">OK</Link>
          </Button>
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
