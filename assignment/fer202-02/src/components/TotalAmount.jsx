import React from "react";
import { Card, Form, Row, Col } from "react-bootstrap";
import {
  useExpenseState,
} from "../contexts/ExpenseContext";

const TotalAmount = () => {
  const { totalAmount } = useExpenseState();


  return (
    <Card className="mb-4 shadow-sm">
      <Card.Header
        as="h5"
        className="d-flex justify-content-between align-items-center"
      >
        <span>Total Expenses</span>
      </Card.Header>
      <Card.Body>
        <Form>
          <Row className="g-3">
            {/* Filter by Semester */}
            <Col xs={6} md={4} lg={2}>
              <Form.Group>
                <Form.Label>
                  <strong className="text-black">
                    {totalAmount.toLocaleString("vi-VN")} ₫
                  </strong>
                </Form.Label>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default TotalAmount;
