import React from "react";
import { Form, Button } from "react-bootstrap";

export const AboutForm = ({ formData, setFormData, errors, onNext }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({
      ...prev,
      avatar: file
    }));
  };

  return (
    <div>
      <div className="d-flex align-items-center mb-4">
        <i className="bi bi-person-fill text-primary me-2 fs-4"></i>
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
            value={formData.firstName || ""}
            onChange={handleInputChange}
            placeholder="Enter your first name"
            className={errors.firstName ? "is-invalid" : ""}
          />
          {errors.firstName && (
            <div className="invalid-feedback">{errors.firstName}</div>
          )}
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
            value={formData.lastName || ""}
            onChange={handleInputChange}
            placeholder="Enter your last name"
            className={errors.lastName ? "is-invalid" : ""}
          />
          {errors.lastName && (
            <div className="invalid-feedback">{errors.lastName}</div>
          )}
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
            value={formData.email || ""}
            onChange={handleInputChange}
            placeholder="Enter your email"
            className={errors.email ? "is-invalid" : ""}
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email}</div>
          )}
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
            value={formData.phone || ""}
            onChange={handleInputChange}
            placeholder="Enter your phone number"
            className={errors.phone ? "is-invalid" : ""}
          />
          {errors.phone && (
            <div className="invalid-feedback">{errors.phone}</div>
          )}
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
            value={formData.age || ""}
            onChange={handleInputChange}
            placeholder="Enter your age"
            className={errors.age ? "is-invalid" : ""}
          />
          {errors.age && (
            <div className="invalid-feedback">{errors.age}</div>
          )}
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
            onChange={handleFileChange}
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
          <Button variant="primary" onClick={onNext}>
            Next
          </Button>
        </div>
      </Form>
    </div>
  );
};
