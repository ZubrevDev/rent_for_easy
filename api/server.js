// server.js
const express = require("express");
const bodyParser = require("body-parser");
const livereload = require("livereload");
const connectLivereload = require("connect-livereload");
const cors = require('cors');
const db = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const apartmentRoutes = require('./routes/apartmentRoutes');
const userRoutesVerification = require('./routes/userRoutesVerification');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// LiveReload setup
if (process.env.NODE_ENV === 'development') {
  const liveReloadServer = livereload.createServer();
  liveReloadServer.watch(__dirname);
  app.use(connectLivereload());
  liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
      liveReloadServer.refresh("/");
    }, 100);
  });
}

// Database connection
db.authenticate()
  .then(() => {
    console.log('Database connected successfully');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/apartments", apartmentRoutes);
app.use("/api/users", userRoutesVerification);

// Base route
app.get("/", (req, res) => {
  res.send("Сервер работает!");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Что-то пошло не так!');
});

// Server start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});