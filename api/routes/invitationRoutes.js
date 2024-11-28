// Этот файл содержит маршруты для отправки и принятия приглашений
// routes/invitationRoutes.js
const express = require("express");
const { sendInvitation } = require("../controllers/invitationController");
const {
  verifyToken,
  verifyLandlordRole,
} = require("../middlewares/authMiddleware");
const router = express.Router();
const { acceptInvitation } = require("../controllers/invitationController");

// Маршрут для отправки приглашения арендатору
router.post("/invite", verifyToken, verifyLandlordRole, sendInvitation);

module.exports = router;

// Маршрут для принятия приглашения арендатором
router.post("/accept", verifyToken, acceptInvitation);
