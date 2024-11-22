// authRoutes.js
const express = require("express");
const { register, login } = require("../controllers/authController");
const { body } = require("express-validator");

const router = express.Router();

// Маршрут регистрации пользователя
router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Некорректный email"),
    body("password").isLength({ min: 8 }).withMessage("Пароль должен содержать не менее 8 символов"),
  ],
  register
);

// Маршрут авторизации пользователя
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Некорректный email"),
    body("password").notEmpty().withMessage("Пароль обязателен"),
  ],
  login
);

module.exports = router;
