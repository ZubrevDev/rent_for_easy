const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).json({ message: "Необходима авторизация." });
  }

  try {
    const decoded = jwt.verify(token.split(" ")[1], "secret_key");
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Неверный токен." });
  }
};

exports.verifyLandlordRole = (req, res, next) => {
  if (req.user.role !== "landlord") {
    return res.status(403).json({ message: "Доступ запрещен. Только арендодатели могут выполнять это действие." });
  }
  next();
};
