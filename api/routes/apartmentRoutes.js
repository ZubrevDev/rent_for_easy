
// api/routes/apartmentRoutes.js
const express = require("express");
const apartmentController = require("../controllers/apartmentController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Маршруты для работы с квартирами
console.log(apartmentController);

router.post("/", authMiddleware.verifyToken, apartmentController.createApartment);
router.get("/", authMiddleware.verifyToken, apartmentController.getApartmentsByLandlord);
router.put("/:id", authMiddleware.verifyToken, apartmentController.updateApartment);
router.delete("/:id", authMiddleware.verifyToken, apartmentController.deleteApartment);

module.exports = router;
