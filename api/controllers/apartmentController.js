// api/controllers/apartmentController.js
const db = require("../db");

// Создание новой квартиры
// Функция используется для добавления новой квартиры арендодателем.
exports.createApartment = (req, res) => {
  const landlordId = req.user.userId; // Извлекаем ID пользователя из токена авторизации
  const { address, description } = req.body; // Получаем адрес и описание квартиры из тела запроса

  // Проверяем, что обязательные поля заполнены
  if (!address || !description) {
    return res.status(400).json({ message: "Пожалуйста, заполните все обязательные поля." });
  }

  // Запрос на добавление квартиры в базу данных
  db.query(
    "INSERT INTO apartments (address, description, landlord_id) VALUES (?, ?, ?)",
    [address, description, landlordId],
    (err, result) => {
      if (err) {
        console.error("Ошибка при создании квартиры:", err);
        res.status(500).json({ message: "Ошибка сервера" }); // Возвращаем ошибку, если не удалось добавить квартиру
        return;
      }
      res.status(201).json({ message: "Квартира успешно добавлена!" }); // Успешное добавление квартиры
    }
  );
};

// Получение всех квартир арендодателя
// Функция используется для получения всех квартир, принадлежащих текущему арендодателю.
exports.getApartmentsByLandlord = (req, res) => {
  const landlordId = req.user.userId; // Извлекаем ID пользователя из токена авторизации

  // Запрос на получение всех квартир, принадлежащих арендодателю
  db.query("SELECT * FROM apartments WHERE landlord_id = ?", [landlordId], (err, results) => {
    if (err) {
      console.error("Ошибка при получении списка квартир:", err);
      res.status(500).json({ message: "Ошибка сервера" }); // Возвращаем ошибку, если не удалось получить список квартир
      return;
    }
    res.status(200).json(results); // Возвращаем список квартир
  });
};

// Обновление информации о квартире
// Функция используется для обновления информации о конкретной квартире.
exports.updateApartment = (req, res) => {
  const apartmentId = req.params.id; // Извлекаем ID квартиры из параметров URL
  const { address, description } = req.body; // Получаем новые данные для квартиры из тела запроса

  // Проверяем, что обязательные поля заполнены
  if (!address || !description) {
    return res.status(400).json({ message: "Пожалуйста, заполните все обязательные поля." });
  }

  // Запрос на обновление информации о квартире
  db.query(
    "UPDATE apartments SET address = ?, description = ? WHERE id = ?",
    [address, description, apartmentId],
    (err, result) => {
      if (err) {
        console.error("Ошибка при обновлении информации о квартире:", err);
        res.status(500).json({ message: "Ошибка сервера" }); // Возвращаем ошибку, если не удалось обновить информацию о квартире
        return;
      }
      res.status(200).json({ message: "Информация о квартире успешно обновлена!" }); // Успешное обновление квартиры
    }
  );
};

// Удаление квартиры
// Функция используется для удаления конкретной квартиры.
exports.deleteApartment = (req, res) => {
  const apartmentId = req.params.id; // Извлекаем ID квартиры из параметров URL

  // Запрос на удаление квартиры из базы данных
  db.query("DELETE FROM apartments WHERE id = ?", [apartmentId], (err, result) => {
    if (err) {
      console.error("Ошибка при удалении квартиры:", err);
      res.status(500).json({ message: "Ошибка сервера" }); // Возвращаем ошибку, если не удалось удалить квартиру
      return;
    }
    res.status(200).json({ message: "Квартира успешно удалена!" }); // Успешное удаление квартиры
  });
};
