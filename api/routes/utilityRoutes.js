// routes/utilityRoutes.js
const express = require('express');
const { addMeterReading, updateUtility, getUtilitiesByApartment } = require('../controllers/utilityController');
const { verifyToken, verifyLandlordRole } = require('../middlewares/authMiddleware');
const router = express.Router();

// Маршрут для добавления показаний счетчиков арендатором
router.post('/add-reading', verifyToken, addMeterReading);

// Маршрут для обновления коммунальных платежей арендодателем
router.put('/update', verifyToken, verifyLandlordRole, updateUtility);

// Маршрут для получения всех коммунальных платежей для квартиры с фильтрацией
router.get('/by-apartment', verifyToken, getUtilitiesByApartment);

module.exports = router;
