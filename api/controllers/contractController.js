// controllers/contractController.js
const { Contract, Apartment, User } = require("../associations");

// Создание нового договора
exports.createContract = async (req, res) => {
  const { apartmentId, tenantId, startDate, endDate } = req.body;

  if (!apartmentId || !tenantId || !startDate || !endDate) {
    return res.status(400).json({ message: "Пожалуйста, заполните все обязательные поля." });
  }

  try {
    // Проверка наличия квартиры и арендатора
    const apartment = await Apartment.findByPk(apartmentId);
    const tenant = await User.findByPk(tenantId);

    if (!apartment) {
      return res.status(404).json({ message: "Квартира не найдена." });
    }

    if (!tenant || tenant.role !== 'tenant') {
      return res.status(404).json({ message: "Арендатор не найден или не является арендатором." });
    }

    // Создание договора
    const contract = await Contract.create({
      start_date: startDate,
      end_date: endDate,
      status: "active",
      tenant_id: tenantId,
      apartment_id: apartmentId,
    });

    res.status(201).json({ message: "Договор успешно создан.", contract });
  } catch (err) {
    console.error("Ошибка при создании договора:", err);
    res.status(500).json({ message: "Ошибка сервера. Пожалуйста, попробуйте позже." });
  }
};
