// Tạo 1 ModalComponent sử dụng useReducer để dùng chung cho LoginForm và SignUpForm và hiển thị thông tin của form
import React from "react";
import { Modal, Card } from "react-bootstrap";

export function ConfirmModal({ show, title, message }) {
  return (
    <>
      {/* Modal */}
      <Modal show={show} centered>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card>
            <Card.Body>
              <p>
                <strong>{message}</strong>
              </p>
            </Card.Body>
          </Card>
        </Modal.Body>
      </Modal>
    </>
  );
}
