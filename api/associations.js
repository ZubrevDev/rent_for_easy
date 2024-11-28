// associations.js
// Этот файл устанавливает связи (ассоциации) между различными моделями в приложении.
// Он импортирует модели User, Apartment, Contract и Utility и задает отношения между ними.
// Например, квартира принадлежит пользователю (арендодателю), контракт принадлежит пользователю (арендатору) и квартире,
// а утилита принадлежит квартире.

const User = require('./models/userModel');
const Apartment = require('./models/apartmentModel');
const Contract = require('./models/contractModel');
const Utility = require('./models/utilityModel');

// Устанавливаем связи здесь
Apartment.belongsTo(User, { foreignKey: "landlord_id", as: "landlord" });
User.hasMany(Apartment, { foreignKey: "landlord_id", as: "apartments" });

Contract.belongsTo(User, { foreignKey: "tenant_id", as: "tenant" });
Contract.belongsTo(Apartment, { foreignKey: "apartment_id", as: "apartment" });

Utility.belongsTo(Apartment, { foreignKey: "apartment_id", as: "apartment" });

// Возможно, добавить дополнительные связи, если они необходимы
// Например, если нужно добавить связь между Utility и User (арендодатель или арендатор)

module.exports = { User, Apartment, Contract, Utility };
