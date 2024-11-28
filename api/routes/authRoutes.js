// api/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Verify routes have proper callbacks
router.post("/register", authController.register); // Make sure this exists
router.post("/login", authController.login);
router.post("/refresh-token", authController.refreshToken);
router.post("/logout", authController.logout);
router.post("/verify-email", authController.verifyEmail);
router.post("/reset-password", authController.resetPassword);

module.exports = router;

