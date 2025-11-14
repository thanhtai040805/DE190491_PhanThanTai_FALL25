import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const Footer = () => {
  return (
    <Card className="footer shadow-sm mt-4 bg-light">
      <Card.Body>
        <Row>
          <Col md={6}>
            <p className="text-black text-start fs-5 mb-0">© 2025 PersonalBudget Demo</p>
          </Col>
          <Col md={6}>  
            <p className="text-black text-end fs-5 mb-0">Built with React, Redux Toolkit and JSON Server</p>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default Footer;