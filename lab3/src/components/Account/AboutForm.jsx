import React from "react";
import { Form, Button } from "react-bootstrap";

export const AboutForm = () => {
  return (
    <div>
      <div className="d-flex align-items-center mb-4">
        <i className="bi bi-person-circle text-primary me-2 fs-4"></i>
        <h3 className="mb-0">About Information</h3>
      </div>

      <Form>
        {/* First Name */}
        <Form.Group className="mb-3">
          <Form.Label className="d-flex align-items-center">
            <i className="bi bi-person me-2"></i>
            First Name *
          </Form.Label>
          <Form.Control
            type="text"
            name="firstName"
            placeholder="Enter your first name"
            required
            isInvalid={false}
          />
          <Form.Control.Feedback type="invalid">
            First name is required
          </Form.Control.Feedback>
        </Form.Group>

        {/* Last Name */}
        <Form.Group className="mb-3">
          <Form.Label className="d-flex align-items-center">
            <i className="bi bi-person me-2"></i>
            Last Name *
          </Form.Label>
          <Form.Control
            type="text"
            name="lastName"
            placeholder="Enter your last name"
            required
            isInvalid={false}
          />
          <Form.Control.Feedback type="invalid">
            Last name is required
          </Form.Control.Feedback>
        </Form.Group>

        {/* Email */}
        <Form.Group className="mb-3">
          <Form.Label className="d-flex align-items-center">
            <i className="bi bi-envelope me-2"></i>
            Email *
          </Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter your email"
            required
            isInvalid={false}
          />
          <Form.Control.Feedback type="invalid">
            Email is required
          </Form.Control.Feedback>
        </Form.Group>

        {/* Phone */}
        <Form.Group className="mb-3">
          <Form.Label className="d-flex align-items-center">
            <i className="bi bi-telephone me-2"></i>
            Phone *
          </Form.Label>
          <Form.Control
            type="tel"
            name="phone"
            placeholder="Enter your phone number"
            required
            isInvalid={false}
          />
          <Form.Control.Feedback type="invalid">
            Phone is required
          </Form.Control.Feedback>
        </Form.Group>

        {/* Age */}
        <Form.Group className="mb-3">
          <Form.Label className="d-flex align-items-center">
            <i className="bi bi-person me-2"></i>
            Age *
          </Form.Label>
          <Form.Control
            type="number"
            name="age"
            placeholder="Enter your age"
            required
            isInvalid={false}
          />
          <Form.Control.Feedback type="invalid">
            Age is required
          </Form.Control.Feedback>
        </Form.Group>

        {/* Avatar */}
        <Form.Group className="mb-4">
          <Form.Label className="d-flex align-items-center">
            <i className="bi bi-person me-2"></i>
            Avatar
          </Form.Label>
          <Form.Control
            type="file"
            name="avatar"
            accept="image/*"
          />
          <Form.Text className="text-muted">
            Choose a profile picture (optional)
          </Form.Text>
        </Form.Group>

        {/* Navigation Buttons */}
        <div className="d-flex justify-content-end gap-2">
          <Button variant="secondary" disabled>
            Previous
          </Button>
          <Button variant="primary">
            Next
          </Button>
        </div>
      </Form>
    </div>
  );
};