import React from "react";
import { Table, Button, ButtonGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { usePaymentState, usePaymentDispatch } from "../contexts/PaymentContext";

const PaymentTable = () => {
  const { displayedPayments, isLoading } = usePaymentState();
  const { deletePayment } = usePaymentDispatch();
  const navigate = useNavigate();

  const handleViewDetails = (id) => {
    navigate(`/payments/${id}`);
  };

  const handleEdit = (id) => {
    navigate(`/payments/${id}/edit`);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa payment này?")) {
      try {
        await deletePayment(id);
        alert("Xóa payment thành công!");
      } catch (error) {
        alert("Lỗi khi xóa payment: " + error.message);
      }
    }
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
  );
};

export default PaymentTable;

