import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/auth/Register.css';
import '../../styles/shared/Form.css';

const Register = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    middleName: '',
    phone: '',
  });

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
    if (formData.password !== formData.confirmPassword) {
      alert('Пароли не совпадают');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName,
          middleName: formData.middleName,
          phone: formData.phone,
          role: userType,
        })
      });

      const data = await response.json();

      if (response.ok) {
        // Перенаправление на соответствующую страницу в зависимости от роли пользователя
        if (userType === 'landlord') {
          navigate('/landlord-dashboard');
        } else if (userType === 'tenant') {
          navigate('/tenant-dashboard');
        } else {
          navigate('/login'); // Перенаправление на страницу логина, если роль неизвестна
        }
      } else {
        alert(data.message || 'Ошибка регистрации');
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('Не удалось завершить регистрацию');
    }
  };

  return (
    <div className="register-container">
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
              type="text"
              name="lastName"
              placeholder="Фамилия"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              name="firstName"
              placeholder="Имя"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              name="middleName"
              placeholder="Отчество"
              value={formData.middleName}
              onChange={handleChange}
            />
          </div>

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
              type="tel"
              name="phone"
              placeholder="Номер телефона"
              value={formData.phone}
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
              type="password"
              name="confirmPassword"
              placeholder="Подтвердите пароль"
              value={formData.confirmPassword}
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