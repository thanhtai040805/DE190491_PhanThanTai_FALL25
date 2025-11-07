import React from "react";
import { useState } from "react";
import { Table, Button, ButtonGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {useAuth} from "../contexts/AuthContext";
import {
  useUserState,
  useUserDispatch,
} from "../contexts/UserContext";

const UserTable = () => {
  const { displayedUsers, isLoading } = useUserState();
  const { updateUserStatus } = useUserDispatch();
  const navigate = useNavigate();
  const { user: currentUser } = useAuth();
  const handleViewDetails = (id) => {
    navigate(`/users/${id}`);
  };

    const handleBanAccount = (id, status) => {
      updateUserStatus(id, { status: status === "active" ? "locked" : "active" });
    };


  if (isLoading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (displayedUsers.length === 0) {
    return (
      <div className="text-center py-5">
        <p className="text-muted">Không có user nào.</p>
      </div>
    );
  }

  return (
    <>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Full Name</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {displayedUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.fullName}</td>
              <td>{user.role}</td>
              <td>{user.status}</td>
              <td>
                <ButtonGroup size="sm" className="d-flex justify-content-center gap-5">
                  <Button
                    variant="info"
                    onClick={() => handleViewDetails(user.id)}
                  >
                    <i className="bi bi-eye me-1"></i>
                    View Details
                  </Button>
                  {currentUser.id !== user.id && (
                  <Button
                    variant="warning"
                    onClick={() => handleBanAccount(user.id, user.status)}
                  >
                    <i className={user.status === "locked" ? "bi bi-unlock me-1" : "bi bi-lock me-1"}></i>
                      {user.status === "locked" ? "Unban Account" : "Ban Account"}
                    </Button>
                  )}
                </ButtonGroup>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default UserTable;
