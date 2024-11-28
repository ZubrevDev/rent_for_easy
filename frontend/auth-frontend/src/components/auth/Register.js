// src/components/auth/Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/auth/Register.css';
import '../../styles/shared/Form.css';

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: ""
  });
  const [userType, setUserType] = useState("tenant");

  const handleUserTypeSelect = (type) => {
    setUserType(type);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:300/api/auth/register", { // Update URL
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          full_name: formData.name,
          phone: formData.phone,
          role: userType
        })
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Ошибка регистрации");
        return;
      }

      // Save token if returned
      if (data.token) {
        localStorage.setItem('token', data.token);
      }

      navigate(userType === "landlord" ? "/landlord-dashboard" : "/tenant-dashboard");
      
    } catch (err) {
      setError("Ошибка сервера. Попробуйте позже.");
      console.error("Registration error:", err);
    }
  };

  return (
    <div className="register-container">
      {error && <div className="error-message">{error}</div>}
      {!userType ? (
        <div className="user-type-selection">
          <h2>Выберите тип аккаунта</h2>
          <div className="button-group">
            <button onClick={() => handleUserTypeSelect('landlord')}>
              Арендодатель
            </button>
            <button onClick={() => handleUserTypeSelect('tenant')}>
              Арендатор
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="register-form">
          <h2>Регистрация как {userType === 'landlord' ? 'Арендодатель' : 'Арендатор'}</h2>
          
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Пароль"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="Полное имя"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="tel"
              name="phone"
              placeholder="Номер телефона"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="submit-button">
            Зарегистрироваться
          </button>
        </form>
      )}
    </div>
  );
};

export default Register;