-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 01, 2026 at 08:43 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `srms`
--

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `customerNumber` varchar(20) NOT NULL,
  `firstName` varchar(100) NOT NULL,
  `lastName` varchar(100) NOT NULL,
  `telephone` varchar(50) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`customerNumber`, `firstName`, `lastName`, `telephone`, `address`) VALUES
('123', 'dew', 'ecdxs', '13431243', 'fcdsfedc'),
('CUST001', 'Alice', 'Uwase', '0788123456', 'Huye District'),
('CUST002', 'Jean', 'Mukamana', '0788234567', 'Nyanza Sector');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `productCode` varchar(20) NOT NULL,
  `productName` varchar(150) NOT NULL,
  `quantitySold` int(11) NOT NULL DEFAULT 0,
  `unitPrice` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`productCode`, `productName`, `quantitySold`, `unitPrice`) VALUES
('PRD001', 'Laptop Model X', 6, 950.00),
('PRD002', 'Printer Pro', 3, 320.00);

-- --------------------------------------------------------

--
-- Table structure for table `sale`
--

CREATE TABLE `sale` (
  `invoiceNumber` varchar(50) NOT NULL,
  `customerNumber` varchar(20) DEFAULT NULL,
  `productCode` varchar(20) DEFAULT NULL,
  `salesDate` date NOT NULL,
  `paymentMethod` varchar(50) DEFAULT NULL,
  `quantity` int(11) NOT NULL,
  `totalAmountPaid` decimal(12,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sale`
--

INSERT INTO `sale` (`invoiceNumber`, `customerNumber`, `productCode`, `salesDate`, `paymentMethod`, `quantity`, `totalAmountPaid`) VALUES
('5675', '123', 'PRD001', '2026-06-01', 'gyuhj', 1, 0.01),
('INV001', 'CUST001', 'PRD001', '2026-05-15', 'Cash', 1, 950.00),
('INV002', 'CUST002', 'PRD002', '2026-05-20', 'Mobile Money', 2, 640.00);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `passwordHash` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `passwordHash`) VALUES
(1, 'admin', '$2b$10$S2mORm8q8qST.4djcyIBvOlWQLJoZ/2tLP2fkIAnp.fC7L9iOpm0C');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`customerNumber`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`productCode`);

--
-- Indexes for table `sale`
--
ALTER TABLE `sale`
  ADD PRIMARY KEY (`invoiceNumber`),
  ADD KEY `customerNumber` (`customerNumber`),
  ADD KEY `productCode` (`productCode`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `sale`
--
ALTER TABLE `sale`
  ADD CONSTRAINT `sale_ibfk_1` FOREIGN KEY (`customerNumber`) REFERENCES `customer` (`customerNumber`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `sale_ibfk_2` FOREIGN KEY (`productCode`) REFERENCES `product` (`productCode`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
