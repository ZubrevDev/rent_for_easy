// Импортируем необходимые библиотеки
const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");

// Создаем экземпляр приложения Express
const app = express();

// Используем body-parser для работы с JSON в запросах
app.use(bodyParser.json());

// Параметры подключения к базе данных MySQL
const db = mysql.createConnection({
  host: "127.0.0.1",         // Используем IPv4, чтобы избежать проблем с IPv6
  user: "root",              // Имя пользователя MySQL (по умолчанию root в MAMP Pro)
  password: "root",          // Пароль MySQL (по умолчанию root в MAMP Pro)
  database: "rent_platform", // Название вашей базы данных
  port: 8889                 // Порт MySQL, указанный в настройках MAMP Pro
});

// Подключение к базе данных
db.connect((err) => {
  if (err) {
    console.error("Ошибка подключения к базе данных:");
    console.error(`Код ошибки: ${err.code}, Адрес: ${err.address}, Порт: ${err.port}`);
    process.exit(1); // Прерываем процесс, если подключение не удалось
  }
  console.log("Успешное подключение к базе данных!");
});

// Пример маршрута для проверки работы сервера
app.get("/", (req, res) => {
  res.send("Сервер работает! хуй");
});

// Пример маршрута для проверки соединения с базой данных
app.get("/test-db", (req, res) => {
  db.query("SELECT 1 + 1 AS solution", (err, results) => {
    if (err) {
      console.error("Ошибка выполнения запроса к базе данных:", err);
      res.status(500).json({ message: "Ошибка подключения к базе данных", error: err });
      return;
    }
    res.json({ message: "Подключение успешно!", result: results[0].solution });
  });
});

// Запуск сервера
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
