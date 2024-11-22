// services/authService.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.registerUser = async (userData) => {
  const { email, password, full_name, role, phone } = userData;

  // Проверка, существует ли пользователь с таким email
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    throw { status: 409, message: "Пользователь с таким email уже существует" };
  }

  // Хеширование пароля
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Создание пользователя
  const user = await User.create({
    email,
    password: hashedPassword,
    full_name,
    role,
    phone,
  });

  return user;
};

exports.loginUser = async (credentials) => {
  const { email, password } = credentials;

  // Поиск пользователя по email
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw { status: 401, message: "Неверный email или пароль" };
  }

  // Проверка пароля
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw { status: 401, message: "Неверный email или пароль" };
  }

  // Генерация токена
  const token = jwt.sign(
    { userId: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  return token;
};
