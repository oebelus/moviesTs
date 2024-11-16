import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import React from 'react';

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<{
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    general?: string;
  }>({});

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({}); // Clear previous errors
    try {
      const response = await axios.post('http://localhost:8000/users/register', formData, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.status === 200) {
        const { id, username } = response.data.user;
        localStorage.setItem('username', username);
        localStorage.setItem('userId', id);
        localStorage.setItem('authenticated', 'true');
        navigate(`/${id}`); // Redirect to user-specific page
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response && error.response.data) {
        const backendErrors = error.response.data.errors || {}; // Assume backend returns a structured error object
        setErrors(backendErrors);
      } else {
        setErrors({ general: 'An unexpected error occurred. Please try again.' });
      }
    }
  };

  return (
    <div className="register-card card text-center">
      <h2 className="create-account">Create an Account</h2>
      <form className="register-form" onSubmit={handleRegister}>
        <div className="username register-form-item">
          <label className="register-label" htmlFor="username">Username</label>
          <input
            className="register-input"
            placeholder="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            type="text"
          />
          {errors.username && <p className="register-error">{errors.username}</p>}
        </div>
        <div className="email register-form-item">
          <label className="register-label" htmlFor="email">Email Address</label>
          <input
            className="register-input"
            placeholder="Email Address"
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="text"
          />
          {errors.email && <p className="register-error">{errors.email}</p>}
        </div>
        <div className="pass register-form-item">
          <label className="register-label" htmlFor="password">Password</label>
          <input
            className="register-input"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            type="password"
          />
          {errors.password && <p className="register-error">{errors.password}</p>}
        </div>
        <div className="confirm register-form-item">
          <label className="register-label" htmlFor="confirmPassword">Confirm Password</label>
          <input
            className="register-input"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            type="password"
          />
          {errors.confirmPassword && <p className="register-error">{errors.confirmPassword}</p>}
        </div>
        <button type="submit" className="register-button">Register</button>
        {errors.general && <p className="register-error general-error">{errors.general}</p>}
      </form>
      <div className="card-footer card-footer-register">
        <div className="login-back">
          Have an account? <span className="like-link" onClick={() => navigate('/login')}>Login</span>
        </div>
      </div>
    </div>
  );
}
