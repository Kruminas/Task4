import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${backendUrl}/api/register`,
        { name, email, password },
        { withCredentials: true }
      );
      navigate("/login");
    } catch (error) {
      console.error(
        "Error registering user:",
        error.response ? error.response.data : error
      );
      setError("Error registering user");
    }
  };

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-dark">
      <div
        className="p-4 shadow bg-white rounded"
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <h2 className="mb-4 text-center">Register</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label>Name</label>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <span className="input-group-text">
                <i className="bi bi-person"></i>
              </span>
            </div>
          </div>
          <div className="form-group">
            <label>Email</label>
            <div className="input-group">
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <span className="input-group-text">
                <i className="bi bi-envelope"></i>
              </span>
            </div>
          </div>
          <div className="form-group">
            <label>Password</label>
            <div className="input-group">
              <input
                type="password"
                className="form-control"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span className="input-group-text">
                <i className="bi bi-lock"></i>
              </span>
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-primary mt-3"
            style={{ width: "100%" }}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;