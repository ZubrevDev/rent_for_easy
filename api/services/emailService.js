// services/emailService.js
const nodemailer = require('nodemailer');

class EmailService {
  constructor(isTest = false) {
    this.transporter = isTest ? this.createTestTransporter() : this.createProductionTransporter();
  }

  createTestTransporter() {
    return nodemailer.createTransport({
      host: 'localhost',
      port: 1025, // Typically used by MailHog for local testing
      ignoreTLS: true
    });
  }

  createProductionTransporter() {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.NODE_ENV === 'production',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
  }

  async sendVerificationEmail(email, token) {
    const verifyUrl = `${process.env.APP_URL}/auth/verify/${token}`;
    
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Подтвердите ваш email',
      html: `
        <h1>Подтверждение email</h1>
        <p>Для подтверждения вашего email, пожалуйста, перейдите по ссылке:</p>
        <a href="${verifyUrl}">${verifyUrl}</a>
      `
    };

    return this.transporter.sendMail(mailOptions);
  }

  async sendPasswordResetEmail(email, token) {
    const resetUrl = `${process.env.APP_URL}/auth/reset-password/${token}`;
    
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Сброс пароля',
      html: `
        <h1>Сброс пароля</h1>
        <p>Для сброса пароля, пожалуйста, перейдите по ссылке:</p>
        <a href="${resetUrl}">${resetUrl}</a>
        <p>Ссылка действительна в течение 1 часа</p>
      `
    };

    return this.transporter.sendMail(mailOptions);
  }
}

// Create singleton instances
const emailService = new EmailService(process.env.NODE_ENV === 'test');
module.exports = emailService;

// For testing
module.exports.EmailService = EmailService;