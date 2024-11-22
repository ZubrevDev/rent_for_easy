// apartmentRoutes.js
const express = require("express");
const {
  createApartment,
  getApartmentsByLandlord,
  updateApartment,
  deleteApartment,
} = require("../controllers/apartmentController");
const { verifyToken, verifyRole } = require("../middlewares/authMiddleware");
const { body } = require("express-validator");

const router = express.Router();

// Создание новой квартиры
router.post(
  "/create",
  verifyToken,
  verifyRole(["landlord", "admin"]),
  [
    body("address").notEmpty().withMessage("Адрес обязателен").isLength({ max: 255 }).withMessage("Адрес слишком длинный"),
    body("description").notEmpty().withMessage("Описание обязательно").isLength({ max: 500 }).withMessage("Описание слишком длинное"),
  ],
  createApartment
);

// Получение всех квартир арендодателя
router.get("/landlord", verifyToken, verifyRole(["landlord", "admin"]), getApartmentsByLandlord);

// Обновление информации о квартире
router.put(
  "/update/:id",
  verifyToken,
  verifyRole(["landlord", "admin"]),
  [
    body("address").notEmpty().withMessage("Адрес обязателен").isLength({ max: 255 }).withMessage("Адрес слишком длинный"),
    body("description").notEmpty().withMessage("Описание обязательно").isLength({ max: 500 }).withMessage("Описание слишком длинное"),
  ],
  updateApartment
);

// Удаление квартиры
router.delete("/delete/:id", verifyToken, verifyRole(["landlord", "admin"]), deleteApartment);

module.exports = router;
