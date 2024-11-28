// config/db.js
const { Sequelize } = require('sequelize');

const db = new Sequelize('rent_platform', 'root', 'root', {
  host: '127.0.0.1',
  dialect: 'mysql',
  port: 8889, // MAMP default port
  logging: console.log,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

// Test connection function
const testConnection = async () => {
  try {
    await db.authenticate();
    console.log('Database connection established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1); // Exit if cannot connect
  }
};

// Initialize connection
testConnection();

module.exports = db;