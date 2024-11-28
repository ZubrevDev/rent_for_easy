// Этот файл содержит функции для создания и отправки уведомлений пользователям через различные каналы (email, SMS, push-уведомления).
// Функция sendEmail отправляет email-уведомления с использованием nodemailer.
// Функция sendNotification отправляет уведомления по указанному каналу (email, SMS, push).
// Функция createNotification создает уведомление в базе данных и сразу отправляет его.

// services/notificationService.js
const Notification = require('../models/notificationModel');
const User = require('../models/userModel');
const nodemailer = require('nodemailer');
require('dotenv').config();

// Функция для отправки email-уведомлений
const sendEmail = async (recipientEmail, subject, message) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: recipientEmail,
    subject: subject,
    text: message,
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Ошибка при отправке email:', error);
    return false;
  }
};

// Основная функция для отправки уведомлений
const sendNotification = async (notificationId) => {
  try {
    const notification = await Notification.findByPk(notificationId, {
      include: [{ model: User, as: 'recipient' }],
    });

    if (!notification) {
      console.error('Уведомление не найдено.');
      return;
    }

    let success = false;

    switch (notification.channel) {
      case 'email':
        success = await sendEmail(notification.recipient.email, 'Новое уведомление', notification.message);
        break;

      case 'sms':
        // Здесь можно добавить интеграцию для отправки SMS (например, через Twilio)
        break;

      case 'push':
        // Здесь можно добавить интеграцию для отправки push-уведомлений
        break;

      default:
        console.error('Неизвестный канал уведомления:', notification.channel);
    }

    if (success) {
      await notification.update({ status: 'sent' });
    } else {
      await notification.update({ status: 'failed' });
    }

  } catch (error) {
    console.error('Ошибка при отправке уведомления:', error);
  }
};

// Функция для создания уведомлений в базе данных
const createNotification = async (recipientId, type, message, channel) => {
  try {
    const notification = await Notification.create({
      recipient_id: recipientId,
      type,
      message,
      channel,
    });

    // После создания сразу отправляем уведомление
    await sendNotification(notification.id);
  } catch (error) {
    console.error('Ошибка при создании уведомления:', error);
  }
};

module.exports = { createNotification };
