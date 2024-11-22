// services/apartmentService.js
const Apartment = require("../models/apartmentModel");

exports.createApartment = async (apartmentData, landlordId) => {
  const { address, description } = apartmentData;

  const apartment = await Apartment.create({
    address,
    description,
    landlord_id: landlordId,
  });

  return apartment;
};

exports.getApartmentsByLandlord = async (landlordId) => {
  const apartments = await Apartment.findAll({
    where: { landlord_id: landlordId },
  });

  return apartments;
};

exports.updateApartment = async (apartmentId, updateData) => {
  const { address, description } = updateData;

  const [updated] = await Apartment.update(
    { address, description },
    { where: { id: apartmentId } }
  );

  if (updated) {
    return await Apartment.findByPk(apartmentId);
  }

  throw { status: 404, message: "Квартира не найдена" };
};

exports.deleteApartment = async (apartmentId) => {
  const deleted = await Apartment.destroy({ where: { id: apartmentId } });
  if (!deleted) {
    throw { status: 404, message: "Квартира не найдена" };
  }

  return { message: "Квартира успешно удалена!" };
};