// api/controllers/apartmentController.js

// Создание новой квартиры
exports.createApartment = (req, res) => {
  const landlordId = req.user.userId;
  const { address, description } = req.body;

  if (!address || !description) {
    return res.status(400).json({ message: "Пожалуйста, заполните все обязательные поля." });
  }

  apartmentModel.createApartment({ address, description, landlordId }, (err, result) => {
    if (err) {
      console.error("Ошибка при создании квартиры:", err);
      res.status(500).json({ message: "Ошибка сервера" });
      return;
    }
    res.status(201).json({ message: "Квартира успешно добавлена!" });
  });
};

// Получение всех квартир арендодателя
exports.getApartmentsByLandlord = (req, res) => {
  const landlordId = req.user.userId;

  apartmentModel.getApartmentsByLandlord(landlordId, (err, results) => {
    if (err) {
      console.error("Ошибка при получении списка квартир:", err);
      res.status(500).json({ message: "Ошибка сервера" });
      return;
    }
    res.status(200).json(results);
  });
};

// Обновление информации о квартире
exports.updateApartment = (req, res) => {
  const apartmentId = req.params.id;
  const { address, description } = req.body;

  apartmentModel.updateApartment(apartmentId, { address, description }, (err, result) => {
    if (err) {
      console.error("Ошибка при обновлении информации о квартире:", err);
      res.status(500).json({ message: "Ошибка сервера" });
      return;
    }
    res.status(200).json({ message: "Информация о квартире успешно обновлена!" });
  });
};

// Удаление квартиры
exports.deleteApartment = (req, res) => {
  const apartmentId = req.params.id;

  apartmentModel.deleteApartment(apartmentId, (err, result) => {
    if (err) {
      console.error("Ошибка при удалении квартиры:", err);
      res.status(500).json({ message: "Ошибка сервера" });
      return;
    }
    res.status(200).json({ message: "Квартира успешно удалена!" });
  });
};
