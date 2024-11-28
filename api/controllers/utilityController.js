/**
 * Этот контроллер выполняет такие операции, связанные с коммунальными услугами, как.
 * расчет стоимости коммунальных услуг, управление записями коммунальных услуг и
 * предоставление данных, связанных с коммунальными услугами, другим частям приложения.
 */

const Utility = require('../models/utilityModel');
const Apartment = require('../models/apartmentModel');
const { Op } = require("sequelize");
const { createNotification } = require('../services/notificationService');

// Добавление данных по счетчику арендатором
exports.addMeterReading = async (req, res) => {
  try {
    const { apartment_id, type, meter_reading, tenant_photo } = req.body;
    const tenantId = req.user.userId;

    if (!apartment_id || !type || !meter_reading || !tenant_photo) {
      return res.status(400).json({ message: "Пожалуйста, заполните все обязательные поля." });
    }

    const utility = await Utility.create({
      apartment_id,
      tenant_id: tenantId,
      type,
      meter_reading,
      tenant_photo,
      date: new Date(),
      status: 'pending',
    });

    // Создание уведомления для арендодателя
    const apartment = await Apartment.findByPk(apartment_id, { include: [{ model: User, as: 'landlord' }] });
    if (apartment && apartment.landlord) {
      createNotification(
        apartment.landlord.id,
        'new_meter_reading',
        `Арендатор добавил данные по счетчикам для квартиры по адресу: ${apartment.address}.`,
        'email'
      );
    }

    res.status(201).json({ message: "Показания счетчика добавлены!", utility });
  } catch (err) {
    console.error("Ошибка при добавлении показаний счетчика:", err);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

// Обновление коммунального платежа арендодателем (добавление суммы и квитанции)
exports.updateUtility = async (req, res) => {
  try {
    const { utility_id, amount, receipt_image, visible_to_tenant } = req.body;

    const utility = await Utility.findByPk(utility_id);
    if (!utility) {
      return res.status(404).json({ message: "Платеж не найден." });
    }

    await utility.update({
      amount,
      receipt_image,
      visible_to_tenant,
      status: "confirmed",
    });

    res.status(200).json({ message: "Платеж обновлен!", utility });
  } catch (err) {
    console.error("Ошибка при обновлении коммунального платежа:", err);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

// Получение всех коммунальных платежей для арендодателя с фильтрацией по месяцам
exports.getUtilitiesByApartment = async (req, res) => {
  try {
    const { apartment_id, month, year } = req.query;

    const whereConditions = {
      apartment_id,
    };

    if (month && year) {
      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 0);
      whereConditions.date = {
        [Op.between]: [startDate, endDate],
      };
    }

    const utilities = await Utility.findAll({
      where: whereConditions,
      include: [{ model: Apartment, as: "apartment" }],
    });

    res.status(200).json(utilities);
  } catch (err) {
    console.error("Ошибка при получении коммунальных платежей:", err);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};
