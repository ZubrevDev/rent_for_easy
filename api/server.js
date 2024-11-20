const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const livereload = require("livereload");
const connectLivereload = require("connect-livereload");

const app = express();
app.use(bodyParser.json());

// Настройка LiveReload
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(__dirname);  // Следим за текущей директорией

app.use(connectLivereload());

liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

// Параметры подключения к базе данных MySQL
const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "root",
  database: "rent_platform",
  port: 8889
});

db.connect((err) => {
  if (err) {
    console.error("Ошибка подключения к базе данных:", err);
    return;
  }
  console.log("Успешное подключение к базе данных!");
});

app.get("/", (req, res) => {
  res.send("Сервер работает!1212w33");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
