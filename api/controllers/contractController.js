/**
 * Этот контроллер управляет операциями, связанными с договорами, такими как
 * создание, обновление и извлечение договоров аренды. Он также
 * обрабатывает проверку и хранение договоров.
 */

const { Contract, User, Apartment } = require('../models'); // Подключаем модели
const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');

exports.generateContract = async (req, res) => {
  try {
    const { id } = req.params; // ID договора

    // Получаем данные о договоре, арендодателе и арендаторе
    const contract = await Contract.findByPk(id, {
      include: [
        { model: User, as: 'landlord' },
        { model: User, as: 'tenant' },
        { model: Apartment, as: 'apartment' },
      ],
    });

    if (!contract) {
      return res.status(404).json({ error: 'Договор не найден' });
    }

    // Подготовка данных для шаблона
    const templateData = {
      city: 'Москва', // Пример города, можно извлечь из `apartment` или другого источника
      day: new Date(contract.start_date).getDate(),
      month: new Date(contract.start_date).toLocaleString('ru', { month: 'long' }),
      year: new Date(contract.start_date).getFullYear(),
      landlord: {
        fullName: `${contract.landlord.firstName} ${contract.landlord.lastName} ${contract.landlord.middleName || ''}`.trim(),
        passportSeries: contract.landlord.passportSeries,
        passportNumber: contract.landlord.passportNumber,
        passportIssuedBy: contract.landlord.passportIssuedBy,
        passportIssueDate: contract.landlord.passportIssueDate,
        passportDivisionCode: contract.landlord.passportDivisionCode,
        registrationAddress: contract.landlord.registrationAddress,
        phone: contract.landlord.phone,
        email: contract.landlord.email,
      },
      tenant: {
        fullName: `${contract.tenant.firstName} ${contract.tenant.lastName} ${contract.tenant.middleName || ''}`.trim(),
        passport: `серия ${contract.tenant.passportSeries}, номер ${contract.tenant.passportNumber}, выдан ${contract.tenant.passportIssuedBy}, ${contract.tenant.passportIssueDate}, код: ${contract.tenant.passportDivisionCode}`,
        registrationAddress: contract.tenant.registrationAddress,
        phone: contract.tenant.phone,
        email: contract.tenant.email,
      },
      rentalCost: contract.rental_price,
      deposit: contract.deposit || null,
      lastMonthPayment: contract.last_month_payment || null,
      conditions: contract.additional_terms || 'Нет дополнительных условий',
    };

    // Читаем шаблон Handlebars
    const templatePath = path.join(__dirname, '../contract-templates/contractTemplate.hbs');
    const templateSource = fs.readFileSync(templatePath, 'utf8');
    const template = handlebars.compile(templateSource);

    // Генерируем HTML
    const html = template(templateData);

    // Отправляем результат
    res.setHeader('Content-Type', 'text/html');
    res.send(html);
  } catch (error) {
    console.error('Ошибка генерации договора:', error);
    res.status(500).send('Ошибка сервера');
  }
};