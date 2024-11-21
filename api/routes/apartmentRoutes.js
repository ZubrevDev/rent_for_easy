const express = require('express');
const {
  getAllApartments,
  getApartmentById,
  createApartment,
  updateApartment,
  deleteApartment
} = require('../controllers/apartmentController');
const router = express.Router();

// Маршрут для получения всех квартир
router.get('/', getAllApartments);

// Маршрут для получения квартиры по ID
router.get('/:id', getApartmentById);

// Маршрут для создания новой квартиры
router.post('/', createApartment);

// Маршрут для обновления информации о квартире
router.put('/:id', updateApartment);

// Маршрут для удаления квартиры
router.delete('/:id', deleteApartment);

module.exports = router;