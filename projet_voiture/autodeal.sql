

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";




CREATE TABLE `reservations` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `voiture_id` int(11) DEFAULT NULL,
  `date_reservation` date DEFAULT NULL,
  `statut` enum('en_attente','confirmee','annulee') DEFAULT 'en_attente'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;




INSERT INTO `reservations` (`id`, `user_id`, `voiture_id`, `date_reservation`, `statut`) VALUES
(1, 6, 5, '2026-04-08', 'confirmee'),
(2, 4, 6, '2026-05-05', 'en_attente'),
(3, 5, 4, '2026-05-01', 'annulee'),
(4, 7, 1, '2026-05-01', 'en_attente'),
(5, 7, 2, '2026-05-01', 'en_attente'),
(6, 7, 4, '2026-05-01', 'en_attente');




CREATE TABLE `utilisateurs` (
  `id` int(11) NOT NULL,
  `nom` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `mot_de_passe` varchar(255) NOT NULL,
  `role` enum('client','admin') DEFAULT 'client',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;



INSERT INTO `utilisateurs` (`id`, `nom`, `email`, `mot_de_passe`, `role`, `created_at`) VALUES
(3, 'ibtihel', 'ibtihel.maaref@isimg.tn', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin', '2026-05-01 12:52:52'),
(4, 'farah hlila', 'farah.hlila@isimg.tn', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'client', '2026-05-01 12:54:00'),
(5, 'ibtihel ben mohamed', 'ibtihel.benmohamed@isimg.tn', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'client', '2026-05-01 12:54:35'),
(6, 'islem', 'islem.noubigh@isimg.tn', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'client', '2026-05-01 12:56:41'),
(7, 'belgacem', 'belgacem.hihi@gmail.com', '$2y$10$Le9gS55ViD43QHcg54K/TeTU0xnuztkXDpVw661SmQe9.k8J83j4e', 'client', '2026-05-01 13:52:51');



CREATE TABLE `voitures` (
  `id` int(11) NOT NULL,
  `titre` varchar(255) NOT NULL,
  `prix` varchar(50) NOT NULL,
  `type` enum('vente','location') NOT NULL,
  `image` varchar(500) DEFAULT NULL,
  `km` varchar(50) DEFAULT NULL,
  `annee` year(4) DEFAULT NULL,
  `carburant` varchar(50) DEFAULT NULL,
  `statut` enum('disponible','reservee') DEFAULT 'disponible',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;



INSERT INTO `voitures` (`id`, `titre`, `prix`, `type`, `image`, `km`, `annee`, `carburant`, `statut`, `created_at`) VALUES
(1, 'Peugeot 208 GT Line', '18 900€', 'vente', 'https://www.largus.fr/images/images/2019-peugeot-208-gt-line-01.jpg', '25 000 km', '2022', 'Essence', 'reservee', '2026-04-28 18:12:00'),
(2, 'Renault Clio E-Tech', '22 500€', 'vente', 'https://photos.auto-moto.com/32/2023/06/photos/330058/zoom-renault-clio-e-tech-full-hybrid-145-esprit-alpine.jpg', '12 000 km', '2023', 'Hybride', 'reservee', '2026-04-28 18:12:00'),
(3, 'BMW Série 3', '45 000€', 'vente', 'https://cdn-xy.drivek.com/eyJidWNrZXQiOiJkYXRhay1jZG4teHkiLCJrZXkiOiJjb25maWd1cmF0b3ItaW1ncy9jYXJzL2ttNzdfZnIvb3JpZ2luYWwvQk1XL1NFUklFUy0zLzUxMzk1X0JFUkxJTkUtNC1QT1JURVMvc2VyaWUtMy1iZXJsaW5lLTAuanBnIiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjoxMDI0LCJoZWlnaHQiOm51bGwsImZpdCI6ImNvdmVyIn19fQ==', '35 000 km', '2021', 'Diesel', 'disponible', '2026-04-28 18:12:00'),
(4, 'Citroën C4', '20.000€/mois', 'location', 'https://www.citroen.ma/content/dam/citroen/master/b2c/models/c4-x/l-m/Citroen_C4_X_Herobanner_2880_1200.jpg?imwidth=1920', 'Illimité', '2023', 'Essence', 'reservee', '2026-04-28 18:12:00'),
(5, 'Geely GX3 pro', '20.000€/mois', 'location', 'https://catalogue.automobile.tn/big/2024/02/47094.webp?t=1', 'Illimité', '2024', 'Essence', 'disponible', '2026-04-28 18:12:00'),
(6, ' Audi RS 6', '30.000€', 'location', 'https://cdn.motor1.com/images/mgl/WR1Po/s3/audi-rs-6-avant-nuova-e-vecchia-a-confronto.webp', 'Illimité', '2002', 'Essence', 'reservee', '2026-05-01 12:38:00'),
(7, 'Porsche Taycan', '105.000 €', 'vente', 'https://www.automobile-propre.com/wp-content/uploads/2019/09/porsche-taycan-turbo-s-2019-01-1024x576.jpg', '450 km', '2019', 'électrique', 'disponible', '2026-05-01 12:48:03');


ALTER TABLE `reservations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `voiture_id` (`voiture_id`);


ALTER TABLE `utilisateurs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);


ALTER TABLE `voitures`
  ADD PRIMARY KEY (`id`);


ALTER TABLE `reservations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;


ALTER TABLE `utilisateurs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;


ALTER TABLE `voitures`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;


ALTER TABLE `reservations`
  ADD CONSTRAINT `reservations_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `utilisateurs` (`id`),
  ADD CONSTRAINT `reservations_ibfk_2` FOREIGN KEY (`voiture_id`) REFERENCES `voitures` (`id`);
COMMIT;


