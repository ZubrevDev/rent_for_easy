// associations.js
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

module.exports = { User, Apartment, Contract, Utility };
