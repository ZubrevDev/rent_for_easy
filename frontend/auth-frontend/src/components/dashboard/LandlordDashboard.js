import React, { useEffect, useState } from 'react';
import { authAPI } from '../services/api'; // Убедитесь, что путь к API корректный

const LandlordDashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await authAPI.getProfile();
        setUser(response.data);
      } catch (err) {
        console.error("Ошибка загрузки профиля:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) return <p>Загрузка...</p>;

  return (
    <div>
      <h2>Landlord Dashboard</h2>
      <p>Статус верификации: {user?.is_verified ? 'Верифицирован' : 'Не верифицирован'}</p>
      <section>
        <h3>Личная информация</h3>
        <p>Имя: {user?.first_name} {user?.last_name}</p>
        <p>Email: {user?.email}</p>
        <p>Телефон: {user?.phone}</p>
      </section>
    </div>
  );
};

export default LandlordDashboard;