import React, { Component } from "react";
import { Nav, ProgressBar, Button } from "react-bootstrap";
import { AboutForm } from "../components/Account/AboutForm";
import { AccountForm } from "../components/Account/AccountForm";
import { AddressForm } from "../components/Account/AddressForm";

export class AccountPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "about",
    };
  }

  tabs = [
    { key: "about", label: "About" },
    { key: "account", label: "Account" },
    { key: "address", label: "Address" },
  ];

  getProgressPercentage = () => {
    switch (this.state.activeTab) {
      case "about":
        return 33;
      case "account":
        return 67;
      case "address":
        return 100;
      default:
        return 33;
    }
  };

  handleTabSelect = (selectedKey) => {
    this.setState({ activeTab: selectedKey });
  };

  renderCurrentForm = () => {
    switch (this.state.activeTab) {
      case "about":
        return <AboutForm />;
      case "account":
        return <AccountForm />;
      case "address":
        return <AddressForm />;
      default:
        return <AboutForm />;
    }
  };

  render() {
    return (
      <div
        id="account-section"
        className="container mt-4"
        style={{ maxWidth: "800px" }}
      >
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
            <span className="text-primary fw-bold">
              {this.getProgressPercentage()}%
            </span>
          </div>
          <ProgressBar
            now={this.getProgressPercentage()}
            variant="primary"
            style={{ height: "8px" }}
          />
        </div>

        {/* Navigation Tabs */}
        <Nav
          variant="tabs"
          activeKey={this.state.activeTab}
          onSelect={this.handleTabSelect}
          className="mb-4"
        >
          {this.tabs.map((tab) => (
            <Nav.Item key={tab.key}>
              <Nav.Link
                eventKey={tab.key}
                className={
                  this.state.activeTab === tab.key ? "text-primary fw-bold" : ""
                }
              >
                {tab.label}
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav>

        {/* Form Content */}
        <div className="bg-white p-4 rounded shadow-sm">
          {this.renderCurrentForm()}
        </div>
      </div>
    );
  }
}
