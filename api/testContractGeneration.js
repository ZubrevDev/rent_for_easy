const { generateContract } = require('./services/contractService'); // Подключаем вашу функцию

// Пример данных для теста
const testContractData = {
  landlord: "Иван Иванов",
  tenant: {
    fullName: "Петр Петров",
    passportSeries: "1234",
    passportNumber: "567890",
    passportIssuedBy: "ОВД Москва",
    passportIssueDate: "10.10.2020",
    passportDivisionCode: "770-001",
    registrationAddress: "г. Москва, ул. Ленина, д. 10",
    phone: "+7 999 123 45 67",
    email: "petr.petrov@example.com",
  },
  apartment: {
    city: "Москва",
  },
  rentalCost: "50000",
  deposit: "50000",
  lastMonthPayment: "50000",
  conditions: "Без домашних животных",
};

// Функция для теста
(async () => {
  try {
    const filePath = await generateContract(testContractData); // Вызываем функцию
    console.log("Контракт успешно создан:", filePath); // Уведомляем об успехе
  } catch (error) {
    console.error("Ошибка при создании контракта:", error); // Обрабатываем ошибки
  }
})();