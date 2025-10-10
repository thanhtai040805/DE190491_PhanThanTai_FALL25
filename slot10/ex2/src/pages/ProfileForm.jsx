import React, { useState } from "react";
import { Nav, ProgressBar, Button } from "react-bootstrap";
import { AboutForm } from "../component/AboutForm";
import { AccountForm } from "../component/AccountForm";
import { AddressForm } from "../component/AddressForm";

export const ProfileForm = () => {
  const [activeTab, setActiveTab] = useState("about");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    age: "",
    avatar: null,
    username: "",
    password: "",
    confirmPassword: "",
    secretQuestion: "",
    answer: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: ""
  });
  const [errors, setErrors] = useState({});

  const tabs = [
    { key: "about", label: "About" },
    { key: "account", label: "Account" },
    { key: "address", label: "Address" }
  ];

  const getProgressPercentage = () => {
    switch (activeTab) {
      case "about": return 33;
      case "account": return 67;
      case "address": return 100;
      default: return 33;
    }
  };

  const validateCurrentStep = () => {
    const newErrors = {};
    
    if (activeTab === "about") {
      if (!formData.firstName) newErrors.firstName = "First name is required";
      if (!formData.lastName) newErrors.lastName = "Last name is required";
      if (!formData.email) newErrors.email = "Email is required";
      if (!formData.phone) newErrors.phone = "Phone is required";
      if (!formData.age) newErrors.age = "Age is required";
    } else if (activeTab === "account") {
      if (!formData.username) newErrors.username = "Username is required";
      if (!formData.password) newErrors.password = "Password is required";
      if (!formData.confirmPassword) newErrors.confirmPassword = "Confirm password is required";
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
      if (!formData.secretQuestion) newErrors.secretQuestion = "Secret question is required";
      if (!formData.answer) newErrors.answer = "Answer is required";
    } else if (activeTab === "address") {
      if (!formData.street) newErrors.street = "Street is required";
      if (!formData.city) newErrors.city = "City is required";
      if (!formData.state) newErrors.state = "State is required";
      if (!formData.zipCode) newErrors.zipCode = "Zip code is required";
      if (!formData.country) newErrors.country = "Country is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleTabSelect = (selectedKey) => {
    if (validateCurrentStep()) {
      setActiveTab(selectedKey);
      setErrors({});
    }
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      const currentIndex = tabs.findIndex(tab => tab.key === activeTab);
      if (currentIndex < tabs.length - 1) {
        setActiveTab(tabs[currentIndex + 1].key);
        setErrors({});
      }
    }
  };

  const handlePrevious = () => {
    const currentIndex = tabs.findIndex(tab => tab.key === activeTab);
    if (currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1].key);
      setErrors({});
    }
  };

  const renderCurrentForm = () => {
    switch (activeTab) {
      case "about":
        return (
          <AboutForm
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            onNext={handleNext}
          />
        );
      case "account":
        return (
          <AccountForm
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case "address":
        return (
          <AddressForm
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            onPrevious={handlePrevious}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: "800px" }}>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="d-flex align-items-center">
          <i className="bi bi-person-circle text-primary me-2 fs-3"></i>
          <h1 className="mb-0">Build Your Profile</h1>
        </div>
        <Button variant="outline-secondary" size="sm">
          <i className="bi bi-x-lg"></i>
        </Button>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <span className="text-muted">Progress</span>
          <span className="text-primary fw-bold">{getProgressPercentage()}%</span>
        </div>
        <ProgressBar 
          now={getProgressPercentage()} 
          variant="primary" 
          style={{ height: "8px" }}
        />
      </div>

      {/* Navigation Tabs */}
      <Nav variant="tabs" activeKey={activeTab} onSelect={handleTabSelect} className="mb-4">
        {tabs.map(tab => (
          <Nav.Item key={tab.key}>
            <Nav.Link 
              eventKey={tab.key}
              className={activeTab === tab.key ? "text-primary fw-bold" : ""}
            >
              {tab.label}
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>

      {/* Form Content */}
      <div className="bg-white p-4 rounded shadow-sm">
        {renderCurrentForm()}
      </div>
    </div>
  );
};
