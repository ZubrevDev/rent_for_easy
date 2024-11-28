// tests/emailService.test.js
const { EmailService } = require('../services/emailService');
const nodemailer = require('nodemailer');

describe('EmailService', () => {
  let emailService;
  let sentMails = [];

  beforeEach(() => {
    // Create test instance
    emailService = new EmailService(true);
    
    // Mock sendMail function
    emailService.transporter.sendMail = jest.fn((mailOptions) => {
      sentMails.push(mailOptions);
      return Promise.resolve({ messageId: 'test-id' });
    });
  });

  afterEach(() => {
    sentMails = [];
  });

  test('should send verification email', async () => {
    const email = 'test@example.com';
    const token = 'test-token';

    await emailService.sendVerificationEmail(email, token);

    expect(sentMails.length).toBe(1);
    expect(sentMails[0].to).toBe(email);
    expect(sentMails[0].subject).toBe('Подтвердите ваш email');
    expect(sentMails[0].html).toContain(token);
  });

  test('should send password reset email', async () => {
    const email = 'test@example.com';
    const token = 'test-token';

    await emailService.sendPasswordResetEmail(email, token);

    expect(sentMails.length).toBe(1);
    expect(sentMails[0].to).toBe(email);
    expect(sentMails[0].subject).toBe('Сброс пароля');
    expect(sentMails[0].html).toContain(token);
  });
});