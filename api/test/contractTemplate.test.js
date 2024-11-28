const { expect } = require('chai');
const handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');
const { Contract, User, Apartment } = require('../models'); // Подключаем модели

describe('Contract Template with Live DB', () => {
    let template;

    before(() => {
        // Загружаем шаблон договора
        const templatePath = path.join(__dirname, '../contract-templates/contractTemplate.hbs');
        const templateContent = fs.readFileSync(templatePath, 'utf-8');
        template = handlebars.compile(templateContent);
    });

    it('should render contract with data from the database', async () => {
        // Создаем тестовые данные в базе
        const landlord = await User.create({
            firstName: 'Иван',
            lastName: 'Иванов',
            middleName: 'Иванович',
            phone: '+79001234567',
            email: 'ivanov@example.com',
        });

        const tenant = await User.create({
            firstName: 'Петр',
            lastName: 'Петров',
            middleName: 'Петрович',
            phone: '+79007654321',
            email: 'petrov@example.com',
        });

        const apartment = await Apartment.create({
            city: 'Москва',
            address: 'ул. Ленина, д. 1',
            landlordId: landlord.id,
        });

        const contract = await Contract.create({
            start_date: new Date('2024-01-01'),
            rental_price: 50000,
            deposit: 50000,
            last_month_payment: 50000,
            apartmentId: apartment.id,
            landlordId: landlord.id,
            tenantId: tenant.id,
        });

        // Получаем договор с включением связанных данных
        const fullContract = await Contract.findByPk(contract.id, {
            include: [
                { model: User, as: 'landlord' },
                { model: User, as: 'tenant' },
                { model: Apartment },
            ],
        });

        // Готовим данные для шаблона
        const templateData = {
            city: fullContract.Apartment.city,
            day: new Date(fullContract.start_date).getDate(),
            month: new Date(fullContract.start_date).toLocaleString('ru', { month: 'long' }),
            year: new Date(fullContract.start_date).getFullYear(),
            landlord: {
                fullName: `${fullContract.landlord.firstName} ${fullContract.landlord.lastName}`,
                phone: fullContract.landlord.phone,
                email: fullContract.landlord.email,
            },
            tenant: {
                fullName: `${fullContract.tenant.firstName} ${fullContract.tenant.lastName}`,
                phone: fullContract.tenant.phone,
                email: fullContract.tenant.email,
            },
            rentalCost: fullContract.rental_price,
            deposit: fullContract.deposit,
            lastMonthPayment: fullContract.last_month_payment,
        };

        // Генерируем HTML из шаблона
        const result = template(templateData);

        // Проверяем, что данные отобразились
        expect(result).to.include('Иван Иванов'); // Арендодатель
        expect(result).to.include('Петр Петров'); // Арендатор
        expect(result).to.include('50000');       // Сумма аренды
        expect(result).to.include('Москва');      // Город
        expect(result).to.include('+79001234567'); // Телефон арендодателя
    });

    after(async () => {
        // Очищаем тестовые данные
        await Contract.destroy({ where: {} });
        await Apartment.destroy({ where: {} });
        await User.destroy({ where: {} });
    });
});