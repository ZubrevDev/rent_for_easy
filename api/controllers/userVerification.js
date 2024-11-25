const { User } = require('../models');

// Получить список пользователей
exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'first_name', 'last_name', 'email', 'is_verified', 'verified_at'], // Только нужные поля
    });
    res.status(200).json(users);
  } catch (error) {
    console.error('Ошибка при получении пользователей:', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
};

// Верифицировать пользователя
exports.verifyUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id); // Найти пользователя по ID
    if (!user) {
      return res.status(404).json({ error: 'Пользователь не найден' });
    }

    // Обновить статус верификации
    user.is_verified = true;
    user.verified_at = new Date(); // Текущая дата и время
    await user.save();

    res.status(200).json({ message: 'Пользователь успешно верифицирован', user });
  } catch (error) {
    console.error('Ошибка при верификации пользователя:', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
};