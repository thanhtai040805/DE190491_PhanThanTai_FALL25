import React from "react";
import { useState } from "react";
import { Table, Button, ButtonGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  usePaymentState,
  usePaymentDispatch,
} from "../contexts/PaymentContext";
import { ConfirmDeleteModal } from "./ConfirmDeleteModal";

const PaymentTable = () => {
  const { displayedPayments, isLoading, showDeleteModal } = usePaymentState();
  const { deletePayment, dispatch } = usePaymentDispatch();
  const navigate = useNavigate();
  const [paymentToDeleteId, setPaymentToDeleteId] = useState(null); // 👈 lưu id local

  const handleViewDetails = (id) => {
    navigate(`/payments/${id}`);
  };

  const handleEdit = (id) => {
    navigate(`/payments/${id}/edit`);
  };

  const handleDelete = (id) => {
    setPaymentToDeleteId(id);
    dispatch({ type: "OPEN_DELETE_MODAL" });
  };

  const handleConfirmDelete = async (id) => {
    await deletePayment(id);
    dispatch({ type: "CLOSE_DELETE_MODAL" });
  };

  const handleCloseDeleteModal = () => {
    dispatch({ type: "CLOSE_DELETE_MODAL" });
    setPaymentToDeleteId(null);
  };

  if (isLoading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (displayedPayments.length === 0) {
    return (
      <div className="text-center py-5">
        <p className="text-muted">Không có payment nào.</p>
      </div>
    );
  }

  return (
    <>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Semester</th>
            <th>Course</th>
            <th>Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {displayedPayments.map((payment) => (
            <tr key={payment.id}>
              <td>{payment.semester}</td>
              <td>{payment.courseName}</td>
              <td>
                <strong className="text-success">
                  {payment.amount.toLocaleString("vi-VN")} ₫
                </strong>
              </td>
              <td>
                <ButtonGroup size="sm">
                  <Button
                    variant="info"
                    onClick={() => handleViewDetails(payment.id)}
                  >
                    <i className="bi bi-eye me-1"></i>
                    View Details
                  </Button>
                  <Button
                    variant="warning"
                    onClick={() => handleEdit(payment.id)}
                  >
                    <i className="bi bi-pencil me-1"></i>
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(payment.id)}
                  >
                    <i className="bi bi-trash me-1"></i>
                    Delete
                  </Button>
                </ButtonGroup>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <ConfirmDeleteModal
        show={showDeleteModal}
        onHide={handleCloseDeleteModal}
        title="Xác nhận xóa"
        message={`Bạn có chắc chắn muốn xóa payment này? (ID: ${paymentToDeleteId})`}
        onConfirm={() => handleConfirmDelete(paymentToDeleteId)}
      />
    </>
  );
};

export default PaymentTable;

