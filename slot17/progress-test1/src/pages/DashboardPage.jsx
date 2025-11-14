import React from "react";
import { useEffect } from "react";
import {
  Container,
  Card,
  Button,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NavigationHeader from "../components/NavigationHeader";
import FilterBar from "../components/FilterBar";
import PaymentTable from "../components/PaymentTable";
import {
  usePaymentState,
  usePaymentDispatch,
} from "../contexts/PaymentContext";
import { useAuth } from "../contexts/AuthContext.jsx";
import { ModalAddPayment } from "../components/ModalAddPayment";

const DashboardPage = () => {
  const { displayedPayments, isLoading, error, showAddModal } =
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
          <Button variant="primary" onClick={handleAddPayment}>
            <i className="bi bi-plus-circle me-2"></i>
            Thêm Payment Mới
          </Button>
        </div>

        <FilterBar />

        <Card className="mb-4 shadow-sm">
          <Card.Header as="h5">
            <i className="bi bi-table me-2"></i>
            Danh sách Payments
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
