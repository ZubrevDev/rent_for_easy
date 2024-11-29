const { User } = require("../models");

// Получить профиль пользователя
exports.getUserProfile = async (req, res) => {
  try {
    // Извлекаем ID пользователя из токена (предполагается, что `req.user.id` доступен)
    const userId = req.user.id;

    const user = await User.findByPk(userId, {
      attributes: ["id", "first_name", "last_name", "email", "phone", "is_verified"]
    });

    if (!user) {
      return res.status(404).json({ success: false, message: "Пользователь не найден" });
    }

    res.status(200).json({ success: true, data: user });
  } catch (err) {
    console.error("Ошибка получения профиля:", err);
    res.status(500).json({ success: false, message: "Ошибка сервера" });
  }
};