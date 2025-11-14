import React from "react";
import { useState } from "react";
import { Table, Button, ButtonGroup, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  useExpenseDispatch, useExpenseState
} from "../contexts/ExpenseContext";
import ConfirmModal from "./ConfirmModal";

const ExpenseManagement = () => {
  const { displayedExpenses, isLoading, showDeleteModal } = useExpenseState();
  const { removeExpense, dispatch } = useExpenseDispatch();
  const navigate = useNavigate();
  const [expenseToDeleteId, setPaymentToDeleteId] = useState(null); // 👈 lưu id local


  const handleDelete = (id) => {
    setPaymentToDeleteId(id);
    dispatch({ type: "OPEN_DELETE_MODAL" });
  };

  const handleConfirmDelete = async (id) => {
    await removeExpense(id);
    dispatch({ type: "CLOSE_DELETE_MODAL" });
  };

  const handleCloseDeleteModal = () => {
    dispatch({ type: "CLOSE_DELETE_MODAL" });
    setPaymentToDeleteId(null);
  };

  const handleEdit = (expense) => {
    dispatch({ type: "OPEN_EDIT_MODAL", payload: expense });
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

  if (displayedExpenses.length === 0) {
    return (
      <div className="text-center py-5">
        <p className="text-muted">Không có expense nào.</p>
      </div>
    );
  }

  return (
    <>
    <Card className="mb-4 shadow-sm">
      <Card.Header
        as="h5"
        className="d-flex justify-content-between align-items-center"
      >
        <span>Expense Management</span>
      </Card.Header>
      <Card.Body>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Name</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {displayedExpenses.map((expense) => (
              <tr key={expense.id}>
                <td>{expense.name}</td>
              <td>
                <strong className="text-black">
                  {expense.amount.toLocaleString("vi-VN")} ₫
                </strong>
              </td>
              <td>{expense.category}</td>
              <td>{expense.date}</td>
              <td>
                <ButtonGroup size="sm">
                  <Button
                    variant="warning"
                    onClick={() => handleEdit(expense)}
                  >
                    <i className="bi bi-pencil me-1"></i>
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(expense.id)}
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
      </Card.Body>
    </Card>
      <ConfirmModal
        show={showDeleteModal}
        onHide={handleCloseDeleteModal}
        title="Confirm Delete"
        message={`Do you want to delete this expense? (ID: ${expenseToDeleteId})`}
        onConfirm={() => handleConfirmDelete(expenseToDeleteId)}
      />
    </>
  );
};

export default ExpenseManagement;
