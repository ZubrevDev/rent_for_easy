// services/contractService.js
const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');
const { PDFDocument, StandardFonts, rgb } = require('pdf-lib');

// Функция для создания договора на основе шаблона и данных
exports.generateContract = async (contractData) => {
  const { landlord, tenant, apartment, rentalCost, conditions, deposit, lastMonthPayment } = contractData;

  // Чтение шаблона
  const templatePath = path.join(__dirname, "../templates", "contractTemplate.hbs");
  const templateContent = fs.readFileSync(templatePath, "utf-8");

  // Компиляция шаблона Handlebars
  const template = handlebars.compile(templateContent);
  const today = new Date();
  const compiledText = template({
    city: apartment.city || "________________",
    day: today.getDate(),
    month: today.toLocaleString('ru', { month: 'long' }),
    year: today.getFullYear(),
    landlord,
    tenant: {
      fullName: tenant.fullName || "___________________",
      passport: tenant.passportSeries
        ? `серия ${tenant.passportSeries}, номер ${tenant.passportNumber}, выдан ${tenant.passportIssuedBy}, ${tenant.passportIssueDate}, код подразделения: ${tenant.passportDivisionCode}`
        : "____________________________",
      registrationAddress: tenant.registrationAddress || "____________________________",
      phone: tenant.phone || "__________________",
      email: tenant.email || "__________________",
    },
    rentalCost: rentalCost || "______",
    deposit: deposit,
    lastMonthPayment: lastMonthPayment,
    conditions: conditions || "____________________________",
  });

  // Создаем новый PDF документ с использованием pdf-lib
  const pdfDoc = await PDFDocument.create();
  const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
  const page = pdfDoc.addPage([600, 800]);
  const { height } = page.getSize();
  const fontSize = 12;

  // Разделяем сгенерированный текст на строки и добавляем их на страницу
  const lines = compiledText.split('\n');
  let yPosition = height - 50;
  lines.forEach((line) => {
    page.drawText(line, {
      x: 50,
      y: yPosition,
      size: fontSize,
      font: timesRomanFont,
      color: rgb(0, 0, 0),
    });
    yPosition -= 20; // Смещение на новую строку
  });

  // Сохранение документа
  const pdfBytes = await pdfDoc.save();
  const filePath = path.join(__dirname, "../contracts", `contract_${tenant.fullName || "template"}.pdf`);
  fs.writeFileSync(filePath, pdfBytes);

  return filePath;
};
