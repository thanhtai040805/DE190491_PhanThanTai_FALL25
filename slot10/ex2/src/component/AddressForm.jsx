import React from "react";
import { Form, Button } from "react-bootstrap";

export const AddressForm = ({ formData, setFormData, errors, onPrevious, onFinish }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div>
      <div className="d-flex align-items-center mb-4">
        <i className="bi bi-geo-alt-fill text-primary me-2 fs-4"></i>
        <h3 className="mb-0">Address Information</h3>
      </div>

      <Form>
        {/* Street */}
        <Form.Group className="mb-3">
          <Form.Label className="d-flex align-items-center">
            <i className="bi bi-geo-alt me-2"></i>
            Street *
          </Form.Label>
          <Form.Control
            type="text"
            name="street"
            value={formData.street || ""}
            onChange={handleInputChange}
            placeholder="Enter your street address"
            className={errors.street ? "is-invalid" : ""}
          />
          {errors.street && (
            <div className="invalid-feedback">{errors.street}</div>
          )}
        </Form.Group>

        {/* City */}
        <Form.Group className="mb-3">
          <Form.Label className="d-flex align-items-center">
            <i className="bi bi-building me-2"></i>
            City *
          </Form.Label>
          <Form.Control
            type="text"
            name="city"
            value={formData.city || ""}
            onChange={handleInputChange}
            placeholder="Enter your city"
            className={errors.city ? "is-invalid" : ""}
          />
          {errors.city && (
            <div className="invalid-feedback">{errors.city}</div>
          )}
        </Form.Group>

        {/* State */}
        <Form.Group className="mb-3">
          <Form.Label className="d-flex align-items-center">
            <i className="bi bi-geo-alt me-2"></i>
            State *
          </Form.Label>
          <Form.Control
            type="text"
            name="state"
            value={formData.state || ""}
            onChange={handleInputChange}
            placeholder="Enter your state/province"
            className={errors.state ? "is-invalid" : ""}
          />
          {errors.state && (
            <div className="invalid-feedback">{errors.state}</div>
          )}
        </Form.Group>

        {/* Zip Code */}
        <Form.Group className="mb-3">
          <Form.Label className="d-flex align-items-center">
            <i className="bi bi-mailbox me-2"></i>
            Zip Code *
          </Form.Label>
          <Form.Control
            type="text"
            name="zipCode"
            value={formData.zipCode || ""}
            onChange={handleInputChange}
            placeholder="Enter your zip/postal code"
            className={errors.zipCode ? "is-invalid" : ""}
          />
          {errors.zipCode && (
            <div className="invalid-feedback">{errors.zipCode}</div>
          )}
        </Form.Group>

        {/* Country */}
        <Form.Group className="mb-4">
          <Form.Label className="d-flex align-items-center">
            <i className="bi bi-flag me-2"></i>
            Country *
          </Form.Label>
          <Form.Select
            name="country"
            value={formData.country || ""}
            onChange={handleInputChange}
            className={errors.country ? "is-invalid" : ""}
          >
            <option value="">Select a country</option>
            <option value="VN">Vietnam</option>
            <option value="US">United States</option>
            <option value="UK">United Kingdom</option>
            <option value="CA">Canada</option>
            <option value="AU">Australia</option>
            <option value="JP">Japan</option>
            <option value="KR">South Korea</option>
            <option value="SG">Singapore</option>
            <option value="TH">Thailand</option>
            <option value="MY">Malaysia</option>
          </Form.Select>
          {errors.country && (
            <div className="invalid-feedback">{errors.country}</div>
          )}
        </Form.Group>

        {/* Navigation Buttons */}
        <div className="d-flex justify-content-end gap-2">
          <Button variant="secondary" onClick={onPrevious}>
            Previous
          </Button>
          <Button variant="success" onClick={onFinish}>
            Finish
          </Button>
        </div>
      </Form>
    </div>
  );
};
