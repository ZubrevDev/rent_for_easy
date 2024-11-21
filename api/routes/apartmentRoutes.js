// api/routes/apartmentRoutes.js
const express = require("express");
const router = express.Router();
const apartmentController = require("../controllers/apartmentController");
const authMiddleware = require("../middlewares/authMiddleware"); // Импортируем миддлвар для авторизации

// Добавление новой квартиры
// Только авторизованный арендодатель может добавлять квартиру
router.post("/", authMiddleware.verifyToken, authMiddleware.verifyLandlordRole, apartmentController.createApartment);

// Получение всех квартир текущего арендодателя
// Только авторизованный арендодатель может видеть свои квартиры
router.get("/", authMiddleware.verifyToken, authMiddleware.verifyLandlordRole, apartmentController.getApartmentsByLandlord);

// Обновление информации о квартире
// Только авторизованный арендодатель может обновлять информацию о квартире
router.put("/:id", authMiddleware.verifyToken, authMiddleware.verifyLandlordRole, apartmentController.updateApartment);

// Удаление квартиры
// Только авторизованный арендодатель может удалять квартиру
router.delete("/:id", authMiddleware.verifyToken, authMiddleware.verifyLandlordRole, apartmentController.deleteApartment);

module.exports = router;
