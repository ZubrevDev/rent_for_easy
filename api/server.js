// api/server.js
const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const livereload = require("livereload");
const connectLivereload = require("connect-livereload");
const authRoutes = require("./routes/authRoutes");
const apartmentRoutes = require('./routes/apartmentRoutes');
const db = require("./config/db");
const app = express();

app.use(bodyParser.json());
app.use("/api/apartments", apartmentRoutes);

// Настройка LiveReload
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(__dirname);
app.use(connectLivereload());

liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

// Параметры подключения к базе данных MySQL
const mysqlConnection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "root",
  database: "rent_platform",
  port: 8889,
});

mysqlConnection.connect((err) => {
  if (err) {
    console.error("Ошибка подключения к базе данных MySQL:", err);
    return;
  }
  console.log("Успешное подключение к базе данных MySQL!");
});

// Подключаем маршруты для авторизации и квартир
app.use("/api/auth", authRoutes);
app.use("/api/apartments", apartmentRoutes);

// Маршрут для проверки работы сервера
app.get("/", (req, res) => {
  res.send("Сервер работает!");
});

// Запуск сервера
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
