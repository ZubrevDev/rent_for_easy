-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Nov 26, 2024 at 10:57 AM
-- Server version: 5.7.39
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `rent_platform`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `password` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `role` enum('admin','landlord','tenant') DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `firstName` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `middleName` varchar(255) DEFAULT NULL,
  `passportSeries` varchar(10) DEFAULT NULL,
  `passportNumber` varchar(10) DEFAULT NULL,
  `passportDivisionCode` varchar(10) DEFAULT NULL,
  `passportIssuedBy` varchar(255) DEFAULT NULL,
  `passportIssueDate` date DEFAULT NULL,
  `birthDate` date DEFAULT NULL,
  `birthPlace` varchar(255) DEFAULT NULL,
  `gender` enum('Мужской','Женский') DEFAULT NULL,
  `registrationAddress` varchar(255) DEFAULT NULL,
  `passportMain` varchar(255) DEFAULT NULL,
  `passportRegistration` varchar(255) DEFAULT NULL,
  `passportSelfie` varchar(255) DEFAULT NULL,
  `is_verified` tinyint(1) DEFAULT '0',
  `verified_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `password`, `username`, `createdAt`, `updatedAt`, `role`, `phone`, `email`, `firstName`, `lastName`, `middleName`, `passportSeries`, `passportNumber`, `passportDivisionCode`, `passportIssuedBy`, `passportIssueDate`, `birthDate`, `birthPlace`, `gender`, `registrationAddress`, `passportMain`, `passportRegistration`, `passportSelfie`, `is_verified`, `verified_at`) VALUES
(1, 'test', 'testlandlord', '2024-11-21 09:35:48', '2024-11-26 11:50:57', 'landlord', '+99999999999', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL),
(3, '$2b$10$4exDbesxlE/OsHESArt05.YJ.2lRk/vcHVqiR7d.g3vnZ/FyAIx9y', 'testadmin', '2024-11-21 14:21:27', '2024-11-21 15:21:58', 'admin', NULL, 'gladius-smol@mail.ru', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL),
(4, '$2b$10$ze5qHVy7TxLBW7lIGZFETecl.laWJUuiDAfCnabyPwlZ5N4fICkWC', 'testtenant', '2024-11-21 15:16:27', '2024-11-21 16:17:10', 'landlord', NULL, 'ivan@example.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `username_2` (`username`),
  ADD UNIQUE KEY `username_3` (`username`),
  ADD UNIQUE KEY `username_4` (`username`),
  ADD UNIQUE KEY `username_5` (`username`),
  ADD UNIQUE KEY `username_6` (`username`),
  ADD UNIQUE KEY `username_7` (`username`),
  ADD UNIQUE KEY `username_8` (`username`),
  ADD UNIQUE KEY `username_9` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
