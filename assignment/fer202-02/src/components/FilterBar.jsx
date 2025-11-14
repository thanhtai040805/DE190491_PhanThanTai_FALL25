import React, { useState, useEffect } from "react";
import { Card, Form, Row, Col } from "react-bootstrap";
import {
  useExpenseState,
  useExpenseDispatch,
} from "../contexts/ExpenseContext";

const FilterBar = () => {
  const { expenses } = useExpenseState();
  const { dispatch } = useExpenseDispatch();
  const [selectedCategory, setSelectedCategory] = useState("");

  // ⚙️ Lấy danh sách unique semester & course từ data
  const categories = [...new Set(expenses.map((p) => p.category))];

  // ⚙️ Lọc & sắp xếp khi input thay đổi
  useEffect(() => {
    let filtered = [...expenses];

    if (selectedCategory !== "") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    dispatch({ type: "SET_FILTERED_EXPENSES", payload: filtered });
  }, [
    selectedCategory,
    expenses,
    dispatch,
  ]);


  return (
    <Card className="mb-4 shadow-sm">
      <Card.Header
        as="h5"
        className="d-flex justify-content-between align-items-center"
      >
        <span>Filter</span>
      </Card.Header>
      <Card.Body>
        <Form>
          <Row className="g-3">
            {/* Filter by Semester */}
            <Col xs={6} md={4} lg={2}>
              <Form.Group>
                <Form.Label>Category</Form.Label>
                <Form.Select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="">Tất cả</option>
                  {categories.map((s, i) => (
                    <option key={i} value={s}>
                      {s}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default FilterBar;
