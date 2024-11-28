/**
 * This controller handles authentication processes including
 * user login, registration, password reset, and token management.
 * It ensures secure access to the application by validating user credentials.
 */

// authController.js
const { registerUser, loginUser } = require("../services/authService");

exports.register = async (req, res) => {
  try {
    const user = await registerUser(req.body);
    res.status(201).json({ message: "Пользователь зарегистрирован!", user });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
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
