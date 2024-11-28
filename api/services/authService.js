// Этот файл содержит функции для регистрации и аутентификации пользователей, включая хеширование паролей и генерацию JWT токенов.
// Функция registerUser регистрирует нового пользователя, хеширует его пароль и сохраняет в базе данных.
// Функция loginUser проверяет учетные данные пользователя и генерирует JWT токен при успешной аутентификации.

// services/authService.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../models/userModel");
const Token = require("../models/tokenModel");
const { sendVerificationEmail, sendPasswordResetEmail } = require("./emailService");

// Existing functions
exports.registerUser = async (userData) => {
  const { email, password, full_name, role, phone } = userData;

  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    throw { status: 409, message: "Пользователь с таким email уже существует" };
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const verificationToken = crypto.randomBytes(32).toString("hex");

  const user = await User.create({
    email,
    password: hashedPassword,
    full_name,
    role,
    phone,
    verificationToken,
    verified: false
  });

  await sendVerificationEmail(email, verificationToken);
  return user;
};

exports.loginUser = async (credentials) => {
  const { email, password } = credentials;

  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw { status: 401, message: "Неверный email или пароль" };
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw { status: 401, message: "Неверный email или пароль" };
  }

  if (!user.verified) {
    throw { status: 401, message: "Email не подтвержден" };
  }

  const token = jwt.sign(
    { userId: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  return token;
};

// New functions
exports.verifyUserEmail = async (token) => {
  const user = await User.findOne({ where: { verificationToken: token } });
  if (!user) {
    throw { status: 400, message: "Неверный токен верификации" };
  }

  await User.update(
    { verified: true, verificationToken: null },
    { where: { id: user.id } }
  );
};

exports.requestPasswordReset = async (email) => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw { status: 404, message: "Пользователь не найден" };
  }

  const resetToken = crypto.randomBytes(32).toString("hex");
  const resetExpires = Date.now() + 3600000; // 1 hour

  await User.update(
    { resetPasswordToken: resetToken, resetPasswordExpires: resetExpires },
    { where: { id: user.id } }
  );

  await sendPasswordResetEmail(email, resetToken);
};

exports.resetUserPassword = async (token, newPassword) => {
  const user = await User.findOne({ 
    where: { 
      resetPasswordToken: token,
      resetPasswordExpires: { [Op.gt]: Date.now() }
    } 
  });

  if (!user) {
    throw { status: 400, message: "Неверный токен или срок действия истек" };
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);

  await User.update(
    {
      password: hashedPassword,
      resetPasswordToken: null,
      resetPasswordExpires: null
    },
    { where: { id: user.id } }
  );
};

exports.refreshUserToken = async (refreshToken) => {
  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const token = jwt.sign(
      { userId: decoded.userId, role: decoded.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    return token;
  } catch (error) {
    throw { status: 401, message: "Невалидный refresh token" };
  }
};

exports.logoutUser = async (userId) => {
  await Token.destroy({ where: { userId } });
};