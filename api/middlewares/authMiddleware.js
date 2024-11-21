// api/middlewares/authMiddleware.js
const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ message: "Нет токена, авторизация отклонена" });
  }

  try {
    const decoded = jwt.verify(token.split(" ")[1], "secret_key");
    req.user = decoded;
    next();  // Обязательно вызовите next(), чтобы передать управление следующему миддлвару/обработчику
  } catch (err) {
    res.status(401).json({ message: "Неверный токен" });
  }
};
