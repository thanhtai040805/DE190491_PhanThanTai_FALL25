import React from "react";
import { useEffect } from "react";
import {
  Container,
  Card,
  Button,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NavigationHeader from "../components/NavigationHeader.jsx";
import FilterBar from "../components/FilterBar.jsx";
import PaymentTable from "../components/PaymentTable.jsx";
import {
  usePaymentState,
  usePaymentDispatch,
} from "../contexts/PaymentContext.jsx";
import { useAuth } from "../contexts/AuthContext.jsx";
import { ModalAddPayment } from "../components/ModalAddPayment.jsx";

const DashboardPage = () => {
  const { displayedPayments, isLoading, error,  totalAmount, showAddModal} =
    usePaymentState();
  const { fetchPaymentsByUserId, dispatch } = usePaymentDispatch();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Khi userId thay đổi => load lại payment
  useEffect(() => {
    if (user) {
      fetchPaymentsByUserId(user.id);
    }
  }, [user.id, fetchPaymentsByUserId]);

  const handleAddPayment = () => {
    dispatch({ type: "OPEN_ADD_MODAL" });
  };

  const handleCloseAddModal = () => {
    dispatch({ type: "CLOSE_ADD_MODAL" });
  };

  return (
    <>
      {/* 1. Header (Navigation Bar) */}
      <NavigationHeader />
      {/* 2. Main Dashboard Content (Grid và Card) */}
      <Container className="mt-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2>Payment Management</h2>
          <div className="d-flex align-items-center">
            <Button variant="primary" onClick={handleAddPayment}>
              <i className="bi bi-plus-circle me-2"></i>
              Thêm Payment Mới
            </Button>
          </div>
        </div>

        <FilterBar />

        <Card className="mb-4 shadow-sm">
          <Card.Header as="h5">
            <div className="d-flex justify-content-between">
              <i className="bi bi-table me-2"></i>
              Danh sách Payments
              <span className="me-3">Total Amount: {totalAmount}</span>
            </div>

          </Card.Header>
          <Card.Body>
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
            <PaymentTable />
          </Card.Body>
        </Card>
      </Container>

      <ModalAddPayment show={showAddModal} onHide={handleCloseAddModal} />
    </>
  );
};

export default DashboardPage;
