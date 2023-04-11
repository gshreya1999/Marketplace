import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./SignUp.css";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);
  const handleConfirmPasswordChange = (event) =>
    setConfirmPassword(event.target.value);

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (email && password && password === confirmPassword) {
      // Handle form submission here
      console.log("Email:", email);
      console.log("Password:", password);
      console.log("Confirm Password:", confirmPassword);

      navigate("/home");
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="signup">
      <h2 className="signup-title">Signup</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input className="form-control" type="email" value={email} onChange={handleEmailChange} />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input className="form-control" type="password" value={password} onChange={handlePasswordChange} />
        </div>
        <div className="form-group">
          <label>Confirm Password:</label>
          <input className="form-control" type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} />
        </div>
        <div className="button-group">
          <button className="btn btn-primary signup-button" type="submit">Signup</button>
          <button className="btn btn-secondary cancel-button" type="button" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
