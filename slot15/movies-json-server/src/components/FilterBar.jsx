import React, { useState, useEffect } from "react";
import { useMotorbikeState, useMotorbikeDispatch } from "../contexts/MotorbikeContext";
import { Form, Button, Row, Col, InputGroup } from "react-bootstrap";

const FilterBar = () => {
  const state = useMotorbikeState();
  const { dispatch } = useMotorbikeDispatch();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [yearRange, setYearRange] = useState([2000, 2025]);
  const [sortOrder, setSortOrder] = useState("");

  // ✅ Lọc, tìm kiếm, sắp xếp
  useEffect(() => {
    let filteredMotorbikes = state.motorbikes;

    // Tìm kiếm
    if (searchTerm.trim() !== "") {
      filteredMotorbikes = filteredMotorbikes.filter((motorbike) =>
        motorbike.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Lọc theo hãng
    if (selectedBrand) {
      filteredMotorbikes = filteredMotorbikes.filter(
        (motorbike) => motorbike.brand === Number(selectedBrand)
      );
    }

    // Lọc theo năm
    filteredMotorbikes = filteredMotorbikes.filter(
      (motorbike) =>
        motorbike.year >= yearRange[0] && motorbike.year <= yearRange[1]
    );

    // Sắp xếp
    if (sortOrder === "asc") {
      filteredMotorbikes = [...filteredMotorbikes].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    } else if (sortOrder === "desc") {
      filteredMotorbikes = [...filteredMotorbikes].sort((a, b) =>
        b.name.localeCompare(a.name)
      );
    }

    dispatch({ type: "SET_FILTERED_MOTORBIKES", payload: filteredMotorbikes });
  }, [searchTerm, selectedBrand, yearRange, sortOrder, state.motorbikes, dispatch]);

  // 🧹 Reset filter
  const resetFilters = () => {
    setSearchTerm("");
    setSelectedBrand("");
    setYearRange([2000, 2025]);
    setSortOrder("");
    dispatch({ type: "SET_FILTERED_MOTORBIKES", payload: state.motorbikes });
  };

  return (
    <div className="bg-light p-3 rounded mb-3">
      <Form>
        <Row className="g-2 align-items-center">
          {/* Ô tìm kiếm */}
          <Col md={3}>
            <Form.Control
              type="text"
              placeholder="🔍 Tìm kiếm motorbike..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-control"
            />
          </Col>

          {/* Hãng xe */}
          <Col md={3}>
            <Form.Select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
            >
              <option value="">-- Tất cả hãng xe --</option>
              {state.brands.map((brand) => (
                <option key={brand.id} value={brand.id}>
                  {brand.name}
                </option>
              ))}
            </Form.Select>
          </Col>

          {/* Năm */}
          <Col md={3}>
            <InputGroup>
              <Form.Control
                type="number"
                value={yearRange[1]}
                onChange={(e) => setYearRange([yearRange[0], Number(e.target.value)])}
              />
              <InputGroup.Text>năm</InputGroup.Text>
            </InputGroup>
          </Col>

          {/* Sắp xếp */}
          <Col md={2}>
            <Form.Select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="">-- Sắp xếp theo tên --</option>
              <option value="asc">A → Z</option>
              <option value="desc">Z → A</option>
            </Form.Select>
          </Col>

          {/* Nút Reset */}
          <Col md={1} className="text-end">
            <Button variant="secondary" onClick={resetFilters}>
              🔄
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default FilterBar;
