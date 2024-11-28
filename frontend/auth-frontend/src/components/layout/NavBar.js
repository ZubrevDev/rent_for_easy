import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Главная</Link></li>
        <li><Link to="/register">Регистрация</Link></li>
        <li><Link to="/login">Вход</Link></li>
        <li><Link to="/profile">Профиль</Link></li>
        <li><Link to="/apartments">Квартиры</Link></li>
        <li><Link to="/contracts">Контракты</Link></li>
        <li><Link to="/landlord-dashboard">Панель арендодателя</Link></li>
        <li><Link to="/tenant-dashboard">Панель арендатора</Link></li>
      </ul>
    </nav>
  );
};

export default NavBar;