// Подключение необходимых модулей
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../db"); // Подключение Sequelize для работы с базой данных
const { DataTypes } = require("sequelize");

// Определение модели User с использованием Sequelize
const User = db.define("user", {
  // Поле для хранения email пользователя
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  // Поле для хранения имени пользователя
  username: { type: DataTypes.STRING, allowNull: true },
  // Поле для хранения пароля пользователя
  password: { type: DataTypes.STRING, allowNull: false },
  // Поле для хранения роли пользователя (администратор, арендодатель, арендатор)
  role: { type: DataTypes.ENUM("admin", "landlord", "tenant"), allowNull: true },
  // Поле для хранения телефона пользователя
  phone: { type: DataTypes.STRING, allowNull: true },
}, {
  tableName: 'users', // Указание имени таблицы в базе данных
  timestamps: false,  // Отключение автоматического создания полей createdAt и updatedAt
});

// Регистрация пользователя
exports.register = async (req, res) => {
  // Получение данных из тела запроса
  const { username, email, password, role, phone } = req.body;

  // Проверка на наличие обязательных полей
  if (!email || !password) {
    return res.status(400).json({ message: "Пожалуйста, заполните все обязательные поля." });
  }

  // Проверка допустимости роли пользователя
  const allowedRoles = ["user", "admin"];
  if (role && !allowedRoles.includes(role)) {
    return res.status(400).json({ message: "Недопустимая роль пользователя." });
  }

  try {
    console.log("Проверка существования пользователя с email:", email);

    // Проверка существования пользователя с данным email
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ message: "Пользователь с таким email уже существует." });
    }

    // Хэширование пароля перед сохранением
    let hashedPassword;
    try {
      console.log("Начинаем хэширование пароля");
      hashedPassword = await bcrypt.hash(password, 10);
      console.log("Хэширование пароля успешно завершено");
    } catch (hashErr) {
      console.error("Ошибка при хэшировании пароля:", hashErr);
      return res.status(500).json({ message: "Ошибка при хэшировании пароля" });
    }

    // Вставка нового пользователя в базу данных
    try {
      console.log("Попытка вставки нового пользователя в базу данных");
      const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
        role,
        phone,
      });

      console.log("Пользователь успешно зарегистрирован:", newUser);
      res.status(201).json({ message: "Пользователь зарегистрирован!" });
    } catch (createErr) {
      console.error("Ошибка при создании пользователя в базе данных:", createErr);
      return res.status(500).json({ message: "Ошибка при создании пользователя в базе данных" });
    }

  } catch (err) {
    console.error("Ошибка при регистрации пользователя:", err);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

// Авторизация пользователя
exports.login = async (req, res) => {
  // Получение данных из тела запроса
  const { email, password } = req.body;

  // Проверка на наличие обязательных полей
  if (!email || !password) {
    return res.status(400).json({ message: "Пожалуйста, заполните все обязательные поля." });
  }

  try {
    // Поиск пользователя по email в базе данных
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: "Неверный email или пароль" });
    }

    // Проверка пароля пользователя
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Неверный email или пароль" });
    }

    // Создание JWT токена для авторизованного пользователя
    const token = jwt.sign({ userId: user.id, role: user.role }, "secret_key", { expiresIn: "1h" });
    res.json({ message: "Авторизация успешна", token });

  } catch (err) {
    console.error("Ошибка при авторизации пользователя:", err);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};
