// api/routes/authRoutes.js
const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

// Маршруты для регистрации и авторизации пользователей
router.post("/register", authController.register);
router.post("/login", authController.login);

module.exports = router;

