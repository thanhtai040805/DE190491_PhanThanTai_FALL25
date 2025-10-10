import React, { useState } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";

export const AccountForm = ({ formData, setFormData, errors, onNext, onPrevious }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div>
      <div className="d-flex align-items-center mb-4">
        <i className="bi bi-shield-lock-fill text-primary me-2 fs-4"></i>
        <h3 className="mb-0">Account Information</h3>
      </div>

      <Form>
        {/* Username */}
        <Form.Group className="mb-3">
          <Form.Label className="d-flex align-items-center">
            <i className="bi bi-person me-2"></i>
            Username *
          </Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={formData.username || ""}
            onChange={handleInputChange}
            placeholder="Enter your username"
            className={errors.username ? "is-invalid" : ""}
          />
          {errors.username && (
            <div className="invalid-feedback">{errors.username}</div>
          )}
        </Form.Group>

        {/* Password */}
        <Form.Group className="mb-3">
          <Form.Label className="d-flex align-items-center">
            <i className="bi bi-lock me-2"></i>
            Password *
          </Form.Label>
          <InputGroup>
            <Form.Control
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password || ""}
              onChange={handleInputChange}
              placeholder="Enter your password"
              className={errors.password ? "is-invalid" : ""}
            />
            <InputGroup.Text 
              style={{ cursor: "pointer" }}
              onClick={togglePasswordVisibility}
            >
              <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
            </InputGroup.Text>
          </InputGroup>
          {errors.password && (
            <div className="invalid-feedback">{errors.password}</div>
          )}
        </Form.Group>

        {/* Confirm Password */}
        <Form.Group className="mb-3">
          <Form.Label className="d-flex align-items-center">
            <i className="bi bi-lock me-2"></i>
            Confirm Password *
          </Form.Label>
          <InputGroup>
            <Form.Control
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword || ""}
              onChange={handleInputChange}
              placeholder="Confirm your password"
              className={errors.confirmPassword ? "is-invalid" : ""}
            />
            <InputGroup.Text 
              style={{ cursor: "pointer" }}
              onClick={toggleConfirmPasswordVisibility}
            >
              <i className={`bi ${showConfirmPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
            </InputGroup.Text>
          </InputGroup>
          {errors.confirmPassword && (
            <div className="invalid-feedback">{errors.confirmPassword}</div>
          )}
        </Form.Group>

        {/* Secret Question */}
        <Form.Group className="mb-3">
          <Form.Label className="d-flex align-items-center">
            <i className="bi bi-question-circle me-2"></i>
            Secret Question *
          </Form.Label>
          <Form.Select
            name="secretQuestion"
            value={formData.secretQuestion || ""}
            onChange={handleInputChange}
            className={errors.secretQuestion ? "is-invalid" : ""}
          >
            <option value="">Select a secret question</option>
            <option value="pet">What is your first pet's name?</option>
            <option value="school">What was the name of your first school?</option>
            <option value="city">What city were you born in?</option>
            <option value="mother">What is your mother's maiden name?</option>
          </Form.Select>
          {errors.secretQuestion && (
            <div className="invalid-feedback">{errors.secretQuestion}</div>
          )}
        </Form.Group>

        {/* Answer */}
        <Form.Group className="mb-4">
          <Form.Label className="d-flex align-items-center">
            <i className="bi bi-key me-2"></i>
            Answer *
          </Form.Label>
          <Form.Control
            type="text"
            name="answer"
            value={formData.answer || ""}
            onChange={handleInputChange}
            placeholder="Enter your answer"
            className={errors.answer ? "is-invalid" : ""}
          />
          {errors.answer && (
            <div className="invalid-feedback">{errors.answer}</div>
          )}
        </Form.Group>

        {/* Navigation Buttons */}
        <div className="d-flex justify-content-end gap-2">
          <Button variant="secondary" onClick={onPrevious}>
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
