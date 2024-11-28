// Этот файл содержит middleware для проверки JWT токенов и ролей пользователей

const jwt = require("jsonwebtoken");

// Проверка JWT токена (временно отключена)
/*
exports.verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token || !token.startsWith("Bearer ")) {
    return res.status(403).json({ message: "Необходима авторизация." });
  }

  try {
    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Неверный токен." });
  }
};
*/

// Временно отключенная проверка JWT токена
exports.verifyToken = (req, res, next) => {
  // Временно отключаем проверку токена
  req.user = { userId: 1, role: 'admin' }; // Используем фиктивного пользователя для тестирования
  next();
};

// Универсальная проверка ролей (временно отключена)
/*
exports.verifyRole = (roles) => {
  return (req, res, next) => {
    const { role } = req.user;
    if (!roles.includes(role)) {
      return res.status(403).json({ message: "Доступ запрещен." });
    }
    next();
  };
};
*/

// Временно отключенная проверка ролей
exports.verifyRole = (roles) => {
  return (req, res, next) => {
    next();
  };
};
