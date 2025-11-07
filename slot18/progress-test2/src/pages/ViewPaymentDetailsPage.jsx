import React, { useEffect, useState } from "react";
import { Container, Card, Button, Badge, Spinner, Alert } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { usePaymentState, usePaymentDispatch } from "../contexts/PaymentContext";
import NavigationHeader from "../components/NavigationHeader";

const ViewPaymentDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { payments, isLoading } = usePaymentState();
  const { deletePayment } = usePaymentDispatch();
  const [payment, setPayment] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (payments.length > 0) {
      const foundPayment = payments.find((p) => p.id === id);
      setPayment(foundPayment);
    }
  }, [id, payments]);

  const handleEdit = () => {
    navigate(`/payments/${id}/edit`);
  };

  const handleDelete = async () => {
    if (window.confirm("Bạn có chắc chắn muốn xóa payment này?")) {
      setIsDeleting(true);
      try {
        await deletePayment(id);
        alert("Xóa payment thành công!");
        navigate("/home");
      } catch (error) {
        alert("Lỗi khi xóa payment: " + error.message);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const handleBack = () => {
    navigate("/home");
  };

  if (isLoading) {
    return (
      <>
        <NavigationHeader />
        <Container className="mt-4">
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" />
            <p className="mt-3">Đang tải thông tin...</p>
          </div>
        </Container>
      </>
    );
  }

  if (!payment) {
    return (
      <>
        <NavigationHeader />
        <Container className="mt-4">
          <Alert variant="warning">
            <Alert.Heading>Không tìm thấy payment</Alert.Heading>
            <p>Payment với ID {id} không tồn tại.</p>
            <Button variant="primary" onClick={handleBack}>
              Quay lại
            </Button>
          </Alert>
        </Container>
      </>
    );
  }

  return (
    <>
      <NavigationHeader />
      <Container className="mt-4">
        <Card className="shadow-sm">
          <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center">
            <h4 className="mb-0">
              <i className="bi bi-info-circle me-2"></i>
              Chi tiết Payment
            </h4>
            <Button variant="light" size="sm" onClick={handleBack}>
              <i className="bi bi-arrow-left me-1"></i>
              Quay lại
            </Button>
          </Card.Header>
          <Card.Body>
            <div className="row">
              <div className="col-md-6 mb-3">
                <h6 className="text-muted">ID</h6>
                <p className="fs-5">{payment.id}</p>
              </div>
              <div className="col-md-6 mb-3">
                <h6 className="text-muted">User ID</h6>
                <p className="fs-5">
                  <Badge bg="secondary">{payment.userId}</Badge>
                </p>
              </div>
            </div>

            <hr />

            <div className="row">
              <div className="col-md-6 mb-3">
                <h6 className="text-muted">
                  <i className="bi bi-calendar3 me-2"></i>
                  Semester
                </h6>
                <p className="fs-5">{payment.semester}</p>
              </div>
              <div className="col-md-6 mb-3">
                <h6 className="text-muted">
                  <i className="bi bi-calendar-event me-2"></i>
                  Date
                </h6>
                <p className="fs-5">{payment.date}</p>
              </div>
            </div>

            <hr />

            <div className="mb-3">
              <h6 className="text-muted">
                <i className="bi bi-book me-2"></i>
                Course Name
              </h6>
              <p className="fs-4 fw-bold text-primary">{payment.courseName}</p>
            </div>

            <hr />

            <div className="mb-4">
              <h6 className="text-muted">
                <i className="bi bi-currency-dollar me-2"></i>
                Amount
              </h6>
              <p className="fs-2 fw-bold text-success">
                {payment.amount.toLocaleString("vi-VN")} ₫
              </p>
            </div>

            <div className="d-flex justify-content-end gap-2">
              <Button variant="secondary" onClick={handleBack}>
                <i className="bi bi-arrow-left me-1"></i>
                Back
              </Button>
              <Button variant="warning" onClick={handleEdit}>
                <i className="bi bi-pencil me-1"></i>
                Edit
              </Button>
              <Button
                variant="danger"
                onClick={handleDelete}
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      className="me-2"
                    />
                    Đang xóa...
                  </>
                ) : (
                  <>
                    <i className="bi bi-trash me-1"></i>
                    Delete
                  </>
                )}
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default ViewPaymentDetailsPage;

