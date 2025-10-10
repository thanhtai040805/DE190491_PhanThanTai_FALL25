import React from "react";
import { Form, InputGroup, Button } from "react-bootstrap";

export const AccountForm = () => {
  return (
    <div>
      <div className="d-flex align-items-center mb-4">
        <i className="bi bi-lock text-primary me-2 fs-4"></i>
        <h3 className="mb-0">Account Information</h3>
      </div>

      <Form>
        {/* Username */}
        <Form.Group className="mb-3">
          <Form.Label className="d-flex align-items-center">
            <i className="bi bi-person me-2"></i>
            Username *
          </Form.Label>
          <InputGroup>
            <InputGroup.Text>
              <i className="bi bi-person"></i>
            </InputGroup.Text>
            <Form.Control
              type="text"
              name="username"
              placeholder="Enter your username"
              required
              isInvalid={false}
            />
          </InputGroup>
          <Form.Control.Feedback type="invalid">
            Username is required
          </Form.Control.Feedback>
        </Form.Group>

        {/* Password */}
        <Form.Group className="mb-3">
          <Form.Label className="d-flex align-items-center">
            <i className="bi bi-lock me-2"></i>
            Password *
          </Form.Label>
          <InputGroup>
            <InputGroup.Text>
              <i className="bi bi-lock"></i>
            </InputGroup.Text>
            <Form.Control
              type="password"
              name="password"
              placeholder="Enter your password"
              required
              isInvalid={false}
            />
          </InputGroup>
          <Form.Control.Feedback type="invalid">
            Password is required
          </Form.Control.Feedback>
        </Form.Group>

        {/* Confirm Password */}
        <Form.Group className="mb-3">
          <Form.Label className="d-flex align-items-center">
            <i className="bi bi-lock me-2"></i>
            Confirm Password *
          </Form.Label>
          <InputGroup>
            <InputGroup.Text>
              <i className="bi bi-lock"></i>
            </InputGroup.Text>
            <Form.Control
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              required
              isInvalid={false}
            />
          </InputGroup>
          <Form.Control.Feedback type="invalid">
            Confirm password is required
          </Form.Control.Feedback>
        </Form.Group>

        {/* Secret Question */}
        <Form.Group className="mb-3">
          <Form.Label className="d-flex align-items-center">
            <i className="bi bi-question-circle me-2"></i>
            Secret Question *
          </Form.Label>
          <Form.Select
            name="secretQuestion"
            required
            isInvalid={false}
          >
            <option value="">Select a secret question</option>
            <option value="pet">What is your first pet's name?</option>
            <option value="school">What was the name of your first school?</option>
            <option value="city">What city were you born in?</option>
            <option value="mother">What is your mother's maiden name?</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            Secret question is required
          </Form.Control.Feedback>
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
            placeholder="Enter your answer"
            required
            isInvalid={false}
          />
          <Form.Control.Feedback type="invalid">
            Answer is required
          </Form.Control.Feedback>
        </Form.Group>

        {/* Navigation Buttons */}
        <div className="d-flex justify-content-end gap-2">
          <Button variant="secondary">
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