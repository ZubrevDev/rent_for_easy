// api/models/apartmentModel.js
const db = require("../db");

// Создание новой квартиры
exports.createApartment = (apartmentData, callback) => {
  const { address, description, landlordId } = apartmentData;
  db.query(
    "INSERT INTO apartments (address, description, landlord_id) VALUES (?, ?, ?)",
    [address, description, landlordId],
    callback
  );
};

// Получение всех квартир арендодателя
exports.getApartmentsByLandlord = (landlordId, callback) => {
  db.query("SELECT * FROM apartments WHERE landlord_id = ?", [landlordId], callback);
};

// Обновление информации о квартире
exports.updateApartment = (apartmentId, apartmentData, callback) => {
  const { address, description } = apartmentData;
  db.query(
    "UPDATE apartments SET address = ?, description = ? WHERE id = ?",
    [address, description, apartmentId],
    callback
  );
};

// Удаление квартиры
exports.deleteApartment = (apartmentId, callback) => {
  db.query("DELETE FROM apartments WHERE id = ?", [apartmentId], callback);
};
