// api/routes/authRoutes.js
const express = require("express");
const { 
  register, 
  login, 
  verifyEmail,
  forgotPassword,
  resetPassword,
  logout,
  refreshToken
} = require("../controllers/authController");
const { body } = require("express-validator");
const { verifyToken, verifyRole } = require("../middlewares/authMiddleware"); // Correct path
const router = express.Router();

// Registration
router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Некорректный email"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Пароль должен содержать не менее 8 символов")
      .matches(/\d/)
      .withMessage("Пароль должен содержать хотя бы одну цифру")
      .matches(/[A-Z]/)
      .withMessage("Пароль должен содержать хотя бы одну заглавную букву"),
    body("name").notEmpty().withMessage("Имя обязательно")
  ],
  register
);

// Login
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Некорректный email"),
    body("password").notEmpty().withMessage("Пароль обязателен"),
  ],
  login
);

// Email verification
router.get("/verify/:token", verifyEmail);

// Password reset
router.post(
  "/forgot-password",
  [
    body("email").isEmail().withMessage("Некорректный email")
  ],
  forgotPassword
);

router.post(
  "/reset-password/:token",
  [
    body("password")
      .isLength({ min: 8 })
      .withMessage("Пароль должен содержать не менее 8 символов")
  ],
  resetPassword
);

// Token refresh
router.post("/refresh-token", refreshToken);

// Logout (requires auth)
router.post("/logout", verifyToken, logout);

module.exports = router;