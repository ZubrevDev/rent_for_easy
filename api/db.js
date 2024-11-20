const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "127.0.0.1",         // Явно используйте IPv4
  user: "root",              // Имя пользователя MAMP
  password: "root",          // Пароль пользователя MySQL
  database: "rent_platform", // Название базы данных
  port: 8889                 // Порт MySQL в MAMP Pro
});

db.connect((err) => {
  if (err) {
    console.error("Ошибка подключения к базе данных:", err);
    return;
  }
  console.log("Успешное подключение к базе данных!");
});
