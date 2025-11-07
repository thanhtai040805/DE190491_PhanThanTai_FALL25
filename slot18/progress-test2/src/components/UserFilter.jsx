import React, { useState, useEffect } from "react";
import { Card, Form, Row, Col, Button } from "react-bootstrap";
import {
  useUserState,
  useUserDispatch,
} from "../contexts/UserContext";    
const UserFilter = () => {
  const { users } = useUserState();
  const { dispatch } = useUserDispatch();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  // ⚙️ Lấy danh sách unique semester & course từ data
  const roles = [...new Set(users.map((u) => u.role))];
  const statuses = [...new Set(users.map((u) => u.status))];

  // ⚙️ Lọc & sắp xếp khi input thay đổi
  useEffect(() => {
    let filtered = [...users];

    if (searchTerm.trim() !== "") {
      filtered = filtered.filter(
        (u) =>
          u.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
          u.fullName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedRole !== "") {
      filtered = filtered.filter((u) => u.role === selectedRole);
    }

    if (selectedStatus !== "") {
      filtered = filtered.filter((u) => u.status === selectedStatus);
    }

    if (sortOrder.includes("role")) {
      filtered.sort((a, b) =>
        sortOrder === "role_asc"
          ? a.role.localeCompare(b.role)
          : b.role.localeCompare(a.role)
      );
    } else if (sortOrder.includes("status")) {
      filtered.sort((a, b) =>
        sortOrder === "status_asc" ? a.status.localeCompare(b.status) : b.status.localeCompare(a.status)
      );
    }

    dispatch({ type: "SET_FILTERED_USERS", payload: filtered });
  }, [
    searchTerm,
    selectedRole,
    selectedStatus,
    sortOrder,
    users,
    dispatch,
  ]);

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedRole("");
    setSelectedStatus("");
    setSortOrder("");
    dispatch({ type: "SET_FILTERED_USERS", payload: users });
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
                <Form.Label>Tìm kiếm (Username/Full Name)</Form.Label>
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
                <Form.Label>Role</Form.Label>
                <Form.Select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                >
                  <option value="">Tất cả</option>
                {roles.map((r, i) => (
                    <option key={i} value={r}>
                      {r}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            {/* Filter by Course */}
            <Col xs={6} md={4} lg={2}>
              <Form.Group>
                <Form.Label>Status</Form.Label>
                <Form.Select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <option value="">Tất cả</option>
                  {statuses.map((s, i) => (
                    <option key={i} value={s}>
                      {s}
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
                  <option value="role_asc">Role tăng dần</option>
                  <option value="role_desc">Role giảm dần</option>
                  <option value="status_asc">Status tăng dần</option>
                  <option value="status_desc">Status giảm dần</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default UserFilter;
