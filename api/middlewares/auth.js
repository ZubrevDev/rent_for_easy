const jwt = require("jsonwebtoken");

/**
 * Middleware для проверки JWT токена
 */
exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({ message: "Токен отсутствует или некорректен" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Убедитесь, что JWT_SECRET настроен в .env
    req.user = decoded; // Добавляем данные пользователя в объект req
    next();
  } catch (error) {
    console.error("Ошибка верификации токена:", error);
    return res.status(401).json({ message: "Недействительный токен" });
  }
};

/**
 * Middleware для проверки роли пользователя
 * @param {string[]} roles - массив допустимых ролей
 */
exports.verifyRole = (roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Доступ запрещён" });
    }
    next();
  };
};