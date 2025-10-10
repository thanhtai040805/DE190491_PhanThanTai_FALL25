import React from "react";
import { Card, Form, Row, Col, Button } from "react-bootstrap";

export default function Filter() {
  return (
    <Card className="mb-4">
      <Card.Header>
        <h5 className="mb-0">
          <i className="bi bi-funnel me-2"></i>
          Filter & Search Movies
        </h5>
      </Card.Header>
      <Card.Body>
        <Row className="g-3">
          {/* Search */}
          <Col md={4}>
            <Form.Group>
              <Form.Label>
                <i className="bi bi-search me-1"></i>
                Search
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Search by title or description..."
              />
            </Form.Group>
          </Col>

          {/* Filter by Year */}
          <Col md={4}>
            <Form.Group>
              <Form.Label>
                <i className="bi bi-calendar me-1"></i>
                Filter by Year
              </Form.Label>
              <Form.Select>
                <option value="">All Years</option>
                <option value="<=2000">≤ 2000</option>
                <option value="2001-2015">2001 - 2015</option>
                <option value=">2015"> {">"} 2015</option>
              </Form.Select>
            </Form.Group>
          </Col>

          {/* Sort */}
          <Col md={4}>
            <Form.Group>
              <Form.Label>
                <i className="bi bi-sort-down me-1"></i>
                Sort by
              </Form.Label>
              <Form.Select>
                <option value="">Default</option>
                <option value="year-asc">Year ↑</option>
                <option value="year-desc">Year ↓</option>
                <option value="title-asc">Title A→Z</option>
                <option value="title-desc">Title Z→A</option>
                <option value="duration-asc">Duration ↑</option>
                <option value="duration-desc">Duration ↓</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        {/* Action Buttons */}
        <Row className="mt-3">
          <Col className="d-flex gap-2">
            <Button variant="primary" size="sm">
              <i className="bi bi-arrow-clockwise me-1"></i>
              Reset Filters
            </Button>
            <Button variant="outline-secondary" size="sm">
              <i className="bi bi-bookmark me-1"></i>
              Save Filter
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
