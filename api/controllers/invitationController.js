/**
 * This controller handles the creation, sending, and management
 * of invitations for users to join the platform. It includes
 * functionalities for generating invitation links and tracking
 * invitation statuses.
 */

const Invitation = require('../models/invitationModel');
const User = require('../models/userModel');
const Apartment = require('../models/apartmentModel');
const { createNotification } = require('../services/notificationService');

// Отправка приглашения арендатору
exports.sendInvitation = async (req, res) => {
  try {
    const { apartment_id, invitee_email, invitee_phone } = req.body;
    const landlordId = req.user.userId;

    if (!apartment_id || !invitee_email) {
      return res.status(400).json({ message: "Пожалуйста, заполните все обязательные поля." });
    }

    const apartment = await Apartment.findByPk(apartment_id);
    if (!apartment || apartment.landlord_id !== landlordId) {
      return res.status(403).json({ message: "Вы не можете приглашать арендаторов к этой квартире." });
    }

    const existingUser = await User.findOne({ where: { email: invitee_email } });
    if (existingUser && existingUser.role !== "tenant") {
      return res.status(400).json({ message: "Пользователь с этим email не является арендатором." });
    }

    const invitation = await Invitation.create({
      apartment_id,
      landlord_id: landlordId,
      invitee_email,
      invitee_phone,
      status: "pending",
    });

    // Создаем уведомление для арендатора
    if (existingUser) {
      createNotification(
        existingUser.id,
        'rental_invitation',
        `Вы получили приглашение на аренду квартиры по адресу: ${apartment.address}.`,
        'email'
      );
    }

    res.status(201).json({ message: "Приглашение отправлено успешно!", invitation });
  } catch (err) {
    console.error("Ошибка при отправке приглашения:", err);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

// Принятие приглашения арендатором
exports.acceptInvitation = async (req, res) => {
    try {
      const { invitation_id } = req.body;
      const tenantId = req.user.userId;
  
      const invitation = await Invitation.findByPk(invitation_id);
      if (!invitation || invitation.status !== "pending" || invitation.invitee_email !== req.user.email) {
        return res.status(403).json({ message: "Неверное приглашение." });
      }
  
      // Создание договора после принятия пригл��шения
      const contract = await Contract.create({
        start_date: new Date(),
        end_date: new Date(new Date().setFullYear(new Date().getFullYear() + 1)), // Срок аренды на год
        status: "active",
        tenant_id: tenantId,
        apartment_id: invitation.apartment_id,
      });
  
      // Обновляем статус приглашения
      await invitation.update({ status: "accepted" });
  
      res.status(200).json({ message: "Приглашение принято, договор создан.", contract });
    } catch (err) {
      console.error("Ошибка при принятии приглашения:", err);
      res.status(500).json({ message: "Ошибка сервера" });
    }
  };