// api/controllers/apartmentController.js
const { body, validationResult } = require("express-validator");
const Apartment = require('../models/apartmentModel'); // Импортируем модель

// Создание новой квартиры
exports.createApartment = [
  body("address").notEmpty().withMessage("Адрес обязателен").isLength({ max: 255 }).withMessage("Адрес слишком длинный"),
  body("description").notEmpty().withMessage("Описание обязательно").isLength({ max: 500 }).withMessage("Описание слишком длинное"),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const landlordId = req.user.userId; // Извлекаем ID пользователя из токена авторизации
    const { address, description } = req.body; // Получаем адрес и описание квартиры из тела запроса

    try {
      // Создание новой квартиры в базе данных
      const apartment = await Apartment.create({ address, description, landlord_id: landlordId });
      res.status(201).json({ message: "Квартира успешно добавлена!", apartment }); // Успешное добавление квартиры
    } catch (err) {
      console.error("Ошибка при создании квартиры:", err);
      res.status(500).json({ message: "Ошибка сервера. Пожалуйста, попробуйте позже." });
    }
  }
];

// Получение всех квартир арендодателя
exports.getApartmentsByLandlord = async (req, res) => {
  const landlordId = req.user.userId; // Извлекаем ID пользователя из токена авторизации

  try {
    // Запрос на получение всех квартир, принадлежащих арендодателю
    const apartments = await Apartment.findAll({ where: { landlord_id: landlordId } });
    res.status(200).json(apartments); // Возвращаем список квартир
  } catch (err) {
    console.error("Ошибка при получении списка квартир:", err);
    res.status(500).json({ message: "Ошибка сервера" }); // Возвращаем ошибку, если не удалось получить список квартир
  }
};

// Обновление информации о квартире
exports.updateApartment = [
  body("address").notEmpty().withMessage("Адрес обязателен").isLength({ max: 255 }).withMessage("Адрес слишком длинный"),
  body("description").notEmpty().withMessage("Описание обязательно").isLength({ max: 500 }).withMessage("Описание слишком длинное"),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const apartmentId = req.params.id; // Извлекаем ID квартиры из параметров URL
    const { address, description } = req.body; // Получаем новые данные для квартиры из тела запроса

    try {
      // Обновление информации о квартире в базе данных
      const [updated] = await Apartment.update({ address, description }, { where: { id: apartmentId } });
      if (updated) {
        res.status(200).json({ message: "Информация о квартире успешно обновлена!" }); // Успешное обновление квартиры
      } else {
        res.status(404).json({ message: "Квартира не найдена" });
      }
    } catch (err) {
      console.error("Ошибка при обновлении информации о квартире:", err);
      res.status(500).json({ message: "Ошибка сервера" });
    }
  }
];

// Удаление квартиры
exports.deleteApartment = async (req, res) => {
  const apartmentId = req.params.id; // Извлекаем ID квартиры из параметров URL

  try {
    // Удаление квартиры из базы данных
    const deleted = await Apartment.destroy({ where: { id: apartmentId } });
    if (deleted) {
      res.status(200).json({ message: "Квартира успешно удалена!" }); // Успешное удаление квартиры
    } else {
      res.status(404).json({ message: "Квартира не найдена" });
    }
  } catch (err) {
    console.error("Ошибка при удалении квартиры:", err);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};
