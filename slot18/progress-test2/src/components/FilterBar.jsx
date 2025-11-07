import React, { useState, useEffect } from "react";
import { Card, Form, Row, Col, Button } from "react-bootstrap";
import {
  usePaymentState,
  usePaymentDispatch,
} from "../contexts/PaymentContext";

const FilterBar = () => {
  const { payments } = usePaymentState();
  const { dispatch } = usePaymentDispatch();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  // ⚙️ Lấy danh sách unique semester & course từ data
  const semesters = [...new Set(payments.map((p) => p.semester))];
  const courses = [...new Set(payments.map((p) => p.courseName))];

  // ⚙️ Lọc & sắp xếp khi input thay đổi
  useEffect(() => {
    let filtered = [...payments];

    if (searchTerm.trim() !== "") {
      filtered = filtered.filter(
        (p) =>
          p.semester.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.courseName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedSemester !== "") {
      filtered = filtered.filter((p) => p.semester === selectedSemester);
    }

    if (selectedCourse !== "") {
      filtered = filtered.filter((p) => p.courseName === selectedCourse);
    }

    if (sortOrder.includes("course")) {
      filtered.sort((a, b) =>
        sortOrder === "course_asc"
          ? a.courseName.localeCompare(b.courseName)
          : b.courseName.localeCompare(a.courseName)
      );
    } else if (sortOrder.includes("date")) {
      filtered.sort((a, b) =>
        sortOrder === "date_asc"
          ? new Date(a.date) - new Date(b.date)
          : new Date(b.date) - new Date(a.date)
      );
    } else if (sortOrder.includes("amount")) {
      filtered.sort((a, b) =>
        sortOrder === "amount_asc" ? a.amount - b.amount : b.amount - a.amount
      );
    }

    dispatch({ type: "SET_FILTERED_PAYMENTS", payload: filtered });
  }, [
    searchTerm,
    selectedSemester,
    selectedCourse,
    sortOrder,
    payments,
    dispatch,
  ]);

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedSemester("");
    setSelectedCourse("");
    setSortOrder("");
    dispatch({ type: "SET_FILTERED_PAYMENTS", payload: payments });
  };

  return (
    <Card className="mb-4 shadow-sm">
      <Card.Header
        as="h5"
        className="d-flex justify-content-between align-items-center"
      >
        <span>Bộ lọc, Tìm kiếm & Sắp xếp</span>
        <Button variant="outline-secondary" size="sm" onClick={resetFilters}>
          Đặt lại
        </Button>
      </Card.Header>
      <Card.Body>
        <Form>
          <Row className="g-3">
            {/* Search  */}
            <Col xs={12} lg={4}>
              <Form.Group>
                <Form.Label>Tìm kiếm (Semester/Course)</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nhập từ khóa..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </Form.Group>
            </Col>

            {/* Filter by Semester */}
            <Col xs={6} md={4} lg={2}>
              <Form.Group>
                <Form.Label>Semester</Form.Label>
                <Form.Select
                  value={selectedSemester}
                  onChange={(e) => setSelectedSemester(e.target.value)}
                >
                  <option value="">Tất cả</option>
                  {semesters.map((s, i) => (
                    <option key={i} value={s}>
                      {s}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            {/* Filter by Course */}
            <Col xs={6} md={4} lg={2}>
              <Form.Group>
                <Form.Label>Course</Form.Label>
                <Form.Select
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                >
                  <option value="">Tất cả</option>
                  {courses.map((c, i) => (
                    <option key={i} value={c}>
                      {c}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            {/* Sorting */}
            <Col xs={12} md={4} lg={4}>
              <Form.Group>
                <Form.Label>Sắp xếp theo</Form.Label>
                <Form.Select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                >
                  <option value="">Không sắp xếp</option>
                  <option value="course_asc">Tên môn tăng dần</option>
                  <option value="course_desc">Tên môn giảm dần</option>
                  <option value="date_asc">Ngày tăng dần</option>
                  <option value="date_desc">Ngày giảm dần</option>
                  <option value="amount_asc">Số tiền tăng dần</option>
                  <option value="amount_desc">Số tiền giảm dần</option>
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
