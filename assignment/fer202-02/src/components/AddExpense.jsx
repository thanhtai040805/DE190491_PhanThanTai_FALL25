import React, { useEffect, useState } from "react";
import { Container, Card, Form, Button, Alert, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  useExpenseDispatch,
  useExpenseState,
} from "../contexts/ExpenseContext";
import { useAuth } from "../contexts/AuthContext";

const today = () => new Date().toISOString().split("T")[0];

const AddExpense = () => {
  const navigate = useNavigate();
  const { addExpense, editExpense, dispatch } = useExpenseDispatch();
  const { isEditing, expenseToEdit } = useExpenseState();
  const { user } = useAuth();

  const [form, setForm] = useState({
    name: "",
    amount: "",
    category: "Food",
    date: today(),
  });
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Prefill when editing
  useEffect(() => {
    if (isEditing && expenseToEdit) {
      setForm({
        name: expenseToEdit.name ?? "",
        amount: String(expenseToEdit.amount ?? ""),
        category: expenseToEdit.category ?? "Food",
        date: expenseToEdit.date ?? today(),
      });
    } else {
      setForm((f) => ({ ...f, date: today() }));
    }
  }, [isEditing, expenseToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Validation on local form
    const amt = Number(form.amount);
    if (!form.name || !form.category || !form.date || form.amount === "") {
      setError("Vui lòng điền đầy đủ thông tin!");
      return;
    }
    if (!Number.isFinite(amt) || amt <= 0) {
      setError("Số tiền phải là số dương!");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        userId: user?.id,
        name: form.name.trim(),
        category: form.category.trim(),
        amount: amt,
        date: form.date,
      };

      if (isEditing && expenseToEdit) {
        await editExpense(expenseToEdit.id, payload);
      } else {
        await addExpense(payload);
      }
      navigate("/home");
    } catch (err) {
      setError("Lỗi khi lưu expense: " + (err?.message || String(err)));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    dispatch({ type: "RESET_FORM" });
    setForm((f) => ({ ...f, name: "", amount: "", category: "", date: today() }));
  };

  return (
    <Container className="mt-4">
      <Card className="shadow-sm">
        <Card.Header as="h4" className="text-black">
          <i className="bi bi-plus-circle me-2"></i>
          {isEditing ? "Edit Expense" : "Add Expense"}
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
                <i className="bi bi-book me-2"></i>
                Name <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Row>
                <Col md="6">
                  <Form.Label>
                    <i className="bi bi-currency-dollar me-2"></i>
                    Amount (₫) <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="number"
                    name="amount"
                    value={form.amount}
                    onChange={handleChange}
                    min="0"
                    step="1000"
                    required
                  />
                </Col>
                <Col md="6">
                  <Form.Label>
                    <i className="bi bi-tags me-2"></i>
                    Category <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Select
                    type="select"
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="Food">Food</option>
                    <option value="Transportation">Transportation</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Utilities">Utilities</option>
                    <option value="Other">Other</option>
                  </Form.Select>
                </Col>
              </Row>
            </Form.Group>

            <Form.Group className="mb-3"></Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>
                <i className="bi bi-calendar-event me-2"></i>
                Date <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <div className="d-flex justify-content-center gap-2">
              <Button
                variant="secondary"
                onClick={handleCancel}
                disabled={isSubmitting}
              >
                <i className="bi bi-x-circle me-1"></i>
                Reset
              </Button>
              <Button variant="primary" type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    />
                    Đang lưu...
                  </>
                ) : (
                  <>
                    <i className="bi bi-check-circle me-1"></i>
                    {isEditing ? "Save" : "Add"}
                  </>
                )}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AddExpense;
