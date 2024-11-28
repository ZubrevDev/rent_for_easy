-- Test data for rent_platform database

-- 1. Test Users
INSERT INTO users (username, password, email, role, firstName, lastName, phone, passportSeries, passportNumber) 
VALUES 
('admin1', 'hash111', 'admin@test.com', 'admin', 'Admin', 'User', '+1234567890', 'AA', '1111111'),
('landlord1', 'hash222', 'landlord1@test.com', 'landlord', 'John', 'Doe', '+1234567891', 'BB', '2222222'),
('landlord2', 'hash333', 'landlord2@test.com', 'landlord', 'Jane', 'Smith', '+1234567892', 'CC', '3333333'),
('tenant1', 'hash444', 'tenant1@test.com', 'tenant', 'Mike', 'Johnson', '+1234567893', 'DD', '4444444'),
('tenant2', 'hash555', 'tenant2@test.com', 'tenant', 'Sarah', 'Wilson', '+1234567894', 'EE', '5555555');

-- 2. Test Apartments
INSERT INTO apartments (landlord_id, address, apartment_number, description, status, tenant_id)
VALUES 
(2, '123 Main St', 'A101', '2-bedroom apartment with balcony', 'occupied', 4),
(2, '123 Main St', 'A102', 'Studio apartment', 'vacant', NULL),
(3, '456 Oak Ave', 'B201', 'Luxury 3-bedroom apartment', 'occupied', 5);

-- 3. Test Contracts
INSERT INTO contracts (landlord_id, tenant_id, apartment_id, contract_text, start_date, end_date, status, deposit, rental_price)
VALUES 
(2, 4, 1, 'Standard lease agreement', '2024-01-01', '2024-12-31', 'Активный', 50000.00, 25000.00),
(2, 5, 2, 'Short-term lease', '2023-01-01', '2023-12-31', 'Завершён', 40000.00, 20000.00),
(3, 5, 3, 'Premium lease agreement', '2024-01-01', NULL, 'Активный', 100000.00, 50000.00);

-- 4. Test Inventory
INSERT INTO inventory (apartment_id, name, quantity, condition, photo_url)
VALUES 
(1, 'Leather Sofa', 1, 'Excellent condition', 'https://example.com/sofa.jpg'),
(1, 'Dining Table', 1, 'Minor scratches on surface', 'https://example.com/table.jpg'),
(1, 'Refrigerator', 1, 'New', 'https://example.com/fridge.jpg'),
(2, 'Bed Frame', 1, 'Good condition', 'https://example.com/bed.jpg');

-- 5. Test Meters
INSERT INTO meters (apartment_id, type, meter_number, meter_type, start_reading, meter_location)
VALUES 
(1, 'Электроэнергия', 'E123456', 'Однотарифный', 0.00, 'Kitchen'),
(1, 'Горячая вода', 'H123456', 'Однотарифный', 0.00, 'Bathroom'),
(1, 'Холодная вода', 'C123456', 'Однотарифный', 0.00, 'Bathroom'),
(2, 'Газ', 'G123456', 'Однотарифный', 0.00, 'Kitchen');

-- 6. Test Documents
INSERT INTO documents (user_id, type, file_path, apartment_id, file_url)
VALUES 
(2, 'passport', '/docs/landlord1_passport.pdf', 1, 'https://example.com/docs/landlord1_passport.pdf'),
(4, 'contract', '/docs/tenant1_contract.pdf', 1, 'https://example.com/docs/tenant1_contract.pdf'),
(5, 'other', '/docs/tenant2_other.pdf', 3, 'https://example.com/docs/tenant2_other.pdf');

-- 7. Verification Queries
SELECT username, role FROM users ORDER BY role;
SELECT address, status FROM apartments ORDER BY landlord_id;
SELECT contract_text, status FROM contracts ORDER BY start_date;
SELECT name, condition FROM inventory ORDER BY apartment_id;
SELECT type, meter_number FROM meters ORDER BY apartment_id;
SELECT type, file_url FROM documents ORDER BY user_id;