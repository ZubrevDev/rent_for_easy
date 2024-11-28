// Этот файл содержит маршруты для создания и подписания договоров
// routes/contractRoutes.js
const express = require('express');
const { createAndSignContract } = require('../controllers/contractController');
const { verifyToken, verifyLandlordRole } = require('../middlewares/authMiddleware');
const router = express.Router();

// Маршрут для создания и подписания договора
router.post('/create', verifyToken, verifyLandlordRole, createAndSignContract);

module.exports = router;
