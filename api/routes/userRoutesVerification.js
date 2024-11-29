// Этот файл содержит маршруты для верификации пользователей
const express = require('express');
const router = express.Router();
const { getUserProfile } = require("../controllers/userController");
const { verifyToken } = require('../middlewares/auth');
const userVerification = require('../controllers/userVerification'); // Подключение userVerification

// Получить список пользователей
router.get('/users', userVerification.getUsers);

router.get("/profile", verifyToken, getUserProfile); //crash DB

// Верифицировать пользователя
router.post('/users/:id/verify', userVerification.verifyUser);

module.exports = router;