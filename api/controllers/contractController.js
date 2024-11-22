// controllers/contractController.js
const { generateContract } = require('../services/contractService');
const fs = require("fs");

// Генерация и создание договора
exports.createContract = async (req, res) => {
  try {
    const { landlord, apartment, rentalCost, conditions, deposit, lastMonthPayment } = req.body;
    const tenant = req.body.tenant || {};

    // Генерация договора
    const contractPath = await generateContract({ landlord, tenant, apartment, rentalCost, conditions, deposit, lastMonthPayment });

    res.status(200).json({ message: "Договор успешно создан.", contractPath });
  } catch (err) {
    console.error("Ошибка при создании договора:", err);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};
