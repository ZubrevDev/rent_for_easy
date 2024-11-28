/**
 * This controller manages apartment-related operations such as
 * adding new apartments, updating apartment details, retrieving
 * apartment information, and handling apartment availability.
 */

// apartmentController.js
const {
  createApartment,
  getApartmentsByLandlord,
  updateApartment,
  deleteApartment,
} = require("../services/apartmentService");
const { validationResult } = require("express-validator");

// Создание новой квартиры
exports.createApartment = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const apartment = await createApartment(req.body, req.user.userId);
    res.status(201).json({ message: "Квартира успешно добавлена!", apartment });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

// Получение всех квартир арендодателя
exports.getApartmentsByLandlord = async (req, res) => {
  try {
    const apartments = await getApartmentsByLandlord(req.user.userId);
    res.status(200).json(apartments);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

// Обновление информации о квартире
exports.updateApartment = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const apartment = await updateApartment(req.params.id, req.body);
    if (apartment) {
      res.status(200).json({ message: "Информация о квартире успешно обновлена!", apartment });
    } else {
      res.status(404).json({ message: "Квартира не найдена" });
    }
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

// Удаление квартиры
exports.deleteApartment = async (req, res) => {
  try {
    const result = await deleteApartment(req.params.id);
    res.status(200).json(result);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};
