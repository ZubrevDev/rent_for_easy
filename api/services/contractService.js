// Этот файл содержит функцию для генерации договора аренды в формате PDF на основе шаблона и данных о контракте.
// Функция generateContract принимает данные контракта, компилирует шаблон с использованием handlebars, создает PDF-документ с кастомным шрифтом и сохраняет его на диск.

const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');
const { PDFDocument, rgb } = require('pdf-lib');
const fontkit = require('fontkit');

const TEMPLATES = {
  CONTRACT: 'rental/contract.hbs',
  RETURN_ACT: 'rental/return-act.hbs',
  TERMINATION: 'rental/termination.hbs'
};

exports.generateContract = async (contractData, templateType = TEMPLATES.CONTRACT) => {
  const { landlord, tenant, apartment, rentalCost, conditions, deposit, lastMonthPayment } = contractData;

  const templatePath = path.join(__dirname, "../contract-templates", templateType);
  const outputPath = path.join(__dirname, '../generated-contracts'); 
  const fontPath = path.join(__dirname, '../fonts', 'Roboto-Regular.ttf'); 
  if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath); 
  }
    
  const templateContent = fs.readFileSync(templatePath, "utf-8");

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

  const pdfDoc = await PDFDocument.create();

  // Регистрируем fontkit
  pdfDoc.registerFontkit(fontkit);

  // Встраиваем кастомный шрифт
  const fontBytes = fs.readFileSync(fontPath);
  const customFont = await pdfDoc.embedFont(fontBytes);

  const page = pdfDoc.addPage([600, 800]);
  const { height } = page.getSize();
  const fontSize = 12;

  const lines = compiledText.split('\n');
  let yPosition = height - 50;
  lines.forEach((line) => {
    page.drawText(line, {
      x: 50,
      y: yPosition,
      size: fontSize,
      font: customFont,
      color: rgb(0, 0, 0),
    });
    yPosition -= 20; // Смещение на новую строку
  });

  const pdfBytes = await pdfDoc.save();
  const filePath = path.join(outputPath, `contract_${tenant.fullName || "template"}.pdf`);
  fs.writeFileSync(filePath, pdfBytes);

  return filePath;
};

// New methods for different document types
exports.generateReturnAct = async (actData) => {
  return await this.generateContract(actData, TEMPLATES.RETURN_ACT);
};

exports.generateTermination = async (terminationData) => {
  return await this.generateContract(terminationData, TEMPLATES.TERMINATION);
};