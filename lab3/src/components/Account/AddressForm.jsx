import React from "react";
import { Form, Button } from "react-bootstrap";

export const AddressForm = () => {
  return (
    <div>
      <div className="d-flex align-items-center mb-4">
        <i className="bi bi-geo-alt text-primary me-2 fs-4"></i>
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
            placeholder="Enter your street address"
            required
            isInvalid={false}
          />
          <Form.Control.Feedback type="invalid">
            Street is required
          </Form.Control.Feedback>
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
            placeholder="Enter your city"
            required
            isInvalid={false}
          />
          <Form.Control.Feedback type="invalid">
            City is required
          </Form.Control.Feedback>
        </Form.Group>

        {/* Country */}
        <Form.Group className="mb-3">
          <Form.Label className="d-flex align-items-center">
            <i className="bi bi-flag me-2"></i>
            Country *
          </Form.Label>
          <Form.Select
            name="country"
            required
            isInvalid={false}
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
          <Form.Control.Feedback type="invalid">
            Country is required
          </Form.Control.Feedback>
        </Form.Group>

        {/* Zip Code */}
        <Form.Group className="mb-4">
          <Form.Label className="d-flex align-items-center">
            <i className="bi bi-mailbox me-2"></i>
            Zip Code *
          </Form.Label>
          <Form.Control
            type="text"
            name="zipCode"
            placeholder="Enter your zip/postal code"
            required
            isInvalid={false}
          />
          <Form.Control.Feedback type="invalid">
            Zip code is required
          </Form.Control.Feedback>
        </Form.Group>

        {/* Navigation Buttons */}
        <div className="d-flex justify-content-end gap-2">
          <Button variant="secondary">
            Previous
          </Button>
          <Button variant="success">
            Finish
          </Button>
        </div>
      </Form>
    </div>
  );
};