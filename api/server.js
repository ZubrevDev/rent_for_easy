const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const livereload = require("livereload");
const connectLivereload = require("connect-livereload");
const authRoutes = require('./routes/authRoutes');
const db = require('./db'); // Подключаем файл с базой данных

// Синхронизация базы данных
db.sync({ alter: true })
  .then(() => console.log('Database synced successfully'))
  .catch(err => console.log('Error syncing database:', err));


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

// Синхронизация базы данных
db.sync()
  .then(() => console.log('Database synced successfully'))
  .catch(err => console.log('Error syncing database:', err));

// Параметры подключения к базе данных MySQL
const mysqlConnection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "root",
  database: "rent_platform",
  port: 8889
});

mysqlConnection.connect((err) => {
  if (err) {
    console.error("Ошибка подключения к базе данных MySQL:", err);
    return;
  }
  console.log("Успешное подключение к базе данных MySQL!");
});

// Подключаем маршруты для авторизации и регистрации
app.use('/api/auth', authRoutes);

app.get("/", (req, res) => {
  res.send("Сервер работает!");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
