/**
 * This controller handles authentication processes including
 * user login, registration, password reset, and token management.
 * It ensures secure access to the application by validating user credentials.
 */

// authController.js
const { 
  registerUser, 
  loginUser, 
  verifyUserEmail,
  requestPasswordReset,
  resetUserPassword,
  refreshUserToken,
  logoutUser
} = require("../services/authService");

// Add request validation
const { body, validationResult } = require('express-validator');

// Add validation middleware
const registerValidation = [
  body('email').isEmail(),
  body('password').isLength({ min: 8 }),
  body('name').notEmpty()
];

exports.register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const user = await registerUser(req.body);
    res.status(201).json({ 
      success: true,
      message: "Пользователь зарегистрирован!",
      data: { user } 
    });
  } catch (err) {
    res.status(err.status || 500).json({
      success: false,
      message: err.message,
      error: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }
};

exports.login = async (req, res) => {
  try {
    const token = await loginUser(req.body);
    res.status(200).json({ message: "Авторизация успешна", token });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

exports.verifyEmail = async (req, res) => {
  try {
    await verifyUserEmail(req.params.token);
    res.status(200).json({ message: "Email подтвержден" });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    await requestPasswordReset(req.body.email);
    res.status(200).json({ message: "Инструкции по сбросу пароля отправлены" });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    await resetUserPassword(req.params.token, req.body.password);
    res.status(200).json({ message: "Пароль успешно изменен" });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

exports.refreshToken = async (req, res) => {
  try {
    const newToken = await refreshUserToken(req.body.refreshToken);
    res.status(200).json({ token: newToken });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

exports.logout = async (req, res) => {
  try {
    await logoutUser(req.user.id);
    res.status(200).json({ message: "Выход выполнен успешно" });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};