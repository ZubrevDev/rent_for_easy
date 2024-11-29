// api/routes/authRoutes.js
const express = require('express');

const { verifyToken } = require('../middlewares/auth');
const authController = require('../controllers/authController');
const router = express.Router();

// Verify routes have proper callbacks
router.post("/register", authController.register); // Make sure this exists
router.post("/login", authController.login);
router.post("/refresh-token", authController.refreshToken);
router.post("/logout", authController.logout);
router.post("/verify-email", authController.verifyEmail);
router.post("/reset-password", authController.resetPassword);
router.get("/protected", verifyToken, (req, res) => {
    res.status(200).json({ message: "Доступ разрешен", user: req.user });
  });

module.exports = router;

