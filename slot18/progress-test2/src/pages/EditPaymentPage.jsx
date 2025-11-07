import React, { useState, useEffect } from "react";
import { Container, Card, Form, Button, Alert, Spinner } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { usePaymentState, usePaymentDispatch } from "../contexts/PaymentContext";
import { useAuth } from "../contexts/AuthContext";
import NavigationHeader from "../components/NavigationHeader";

const EditPaymentPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { payments, isLoading } = usePaymentState();
  const { updatePayment } = usePaymentDispatch();
  const { user } = useAuth();
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [payment, setPayment] = useState(null);

  const [formData, setFormData] = useState({
    semester: "",
    courseName: "",
    amount: "",
    date: "",
  });

  useEffect(() => {
    if (payments.length > 0) {
      const foundPayment = payments.find((p) => p.id === id);
      if (foundPayment) {
        setPayment(foundPayment);
        setFormData({
          semester: foundPayment.semester || "",
          courseName: foundPayment.courseName || "",
          amount: foundPayment.amount || "",
          date: foundPayment.date || "",
        });
      }
    }
  }, [id, payments]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!formData.semester || !formData.courseName || !formData.amount || !formData.date) {
      setError("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    if (isNaN(formData.amount) || parseFloat(formData.amount) <= 0) {
      setError("Số tiền phải là số dương!");
      return;
    }

    setIsSubmitting(true);

    try {
      const updatedPayment = {
        userId: user.id,
        semester: formData.semester,
        courseName: formData.courseName,
        amount: parseFloat(formData.amount),
        date: formData.date,
      };

      await updatePayment(id, updatedPayment);
      alert("Cập nhật payment thành công!");
      navigate(`/payments/${id}`);
    } catch (err) {
      setError("Lỗi khi cập nhật payment: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate(`/payments/${id}`);
  };

  if (isLoading || !payment) {
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

  return (
    <>
      <NavigationHeader />
      <Container className="mt-4">
        <Card className="shadow-sm">
          <Card.Header as="h4" className="bg-warning text-dark">
            <i className="bi bi-pencil-square me-2"></i>
            Chỉnh sửa Payment
          </Card.Header>
          <Card.Body>
            {error && (
              <Alert variant="danger" dismissible onClose={() => setError(null)}>
                {error}
              </Alert>
            )}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>
                  <i className="bi bi-calendar3 me-2"></i>
                  Semester <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="semester"
                  value={formData.semester}
                  onChange={handleChange}
                  placeholder="Ví dụ: Fall 2025"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>
                  <i className="bi bi-book me-2"></i>
                  Course Name <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="courseName"
                  value={formData.courseName}
                  onChange={handleChange}
                  placeholder="Ví dụ: Web Development"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>
                  <i className="bi bi-currency-dollar me-2"></i>
                  Amount (₫) <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  placeholder="Ví dụ: 3500000"
                  min="0"
                  step="1000"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>
                  <i className="bi bi-calendar-event me-2"></i>
                  Date <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <div className="d-flex justify-content-end gap-2">
                <Button
                  variant="secondary"
                  onClick={handleCancel}
                  disabled={isSubmitting}
                >
                  <i className="bi bi-x-circle me-1"></i>
                  Cancel
                </Button>
                <Button
                  variant="warning"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Đang lưu...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-check-circle me-1"></i>
                      Cập nhật Payment
                    </>
                  )}
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default EditPaymentPage;

