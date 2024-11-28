// Этот файл содержит маршруты для верификации пользователей
const express = require('express');
const router = express.Router();
const userVerification = require('../controllers/userVerification'); // Подключаем новый контроллер

// Получить список пользователей
router.get('/users', userVerification.getUsers);

// Верифицировать пользователя
router.post('/users/:id/verify', userVerification.verifyUser);

module.exports = router;