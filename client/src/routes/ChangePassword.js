import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./ChangePassword.css";
import { useNavigate } from "react-router-dom";

export default function ChangePassword(props) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newPassword !== confirmNewPassword) {
      setErrorMessage("New passwords do not match.");
    } else {
      navigate("/settings");
    }
  };
  

  return (
    <div className="container">
      <h1 className="text-center mb-5 heading">Change Password</h1>
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8 col-sm-10">
          {errorMessage && (
            <div className="alert alert-danger" role="alert">
              {errorMessage}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="current-password" className="form-label">
                Current Password
              </label>
              <input
                type="password"
                className="form-control"
                id="current-password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="new-password" className="form-label">
                New Password
              </label>
              <input
                type="password"
                className="form-control"
                id="new-password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="confirm-new-password" className="form-label">
                Confirm New Password
              </label>
              <input
                type="password"
                className="form-control"
                id="confirm-new-password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
