-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : dim. 18 fév. 2024 à 18:05
-- Version du serveur : 10.4.28-MariaDB
-- Version de PHP : 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `noPlagiat`
--

-- --------------------------------------------------------

--
-- Structure de la table `formules`
--

CREATE TABLE `formules` (
  `id` int(11) NOT NULL,
  `titre` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `nbmot` int(11) NOT NULL,
  `nbpage` int(11) NOT NULL,
  `expireAt` int(11) NOT NULL,
  `isAvailable` tinyint(1) NOT NULL,
  `nbpost` int(11) NOT NULL,
  `image` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `formules`
--

INSERT INTO `formules` (`id`, `titre`, `description`, `nbmot`, `nbpage`, `expireAt`, `isAvailable`, `nbpost`, `image`, `createdAt`, `updatedAt`) VALUES
(1, 'test', 'testy', 90, 9, 2, 0, 2, 'upload/formules/1708271135927.jpeg', '2024-02-18 15:45:35', '2024-02-18 15:45:35');

-- --------------------------------------------------------

--
-- Structure de la table `rapports`
--

CREATE TABLE `rapports` (
  `id` int(11) NOT NULL,
  `rapport` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `rapports`
--

INSERT INTO `rapports` (`id`, `rapport`, `createdAt`, `updatedAt`, `userId`) VALUES
(1, '', '2024-02-18 16:04:43', '2024-02-18 16:04:43', 1),
(2, 'upload/rapport/1708272327515.pdf', '2024-02-18 16:05:27', '2024-02-18 16:05:27', 1);

-- --------------------------------------------------------

--
-- Structure de la table `souscriptions`
--

CREATE TABLE `souscriptions` (
  `id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `formuleId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `souscriptions`
--

INSERT INTO `souscriptions` (`id`, `createdAt`, `updatedAt`, `userId`, `formuleId`) VALUES
(1, '2024-02-18 16:59:11', '2024-02-18 16:59:11', 1, 1),
(2, '2024-02-18 17:01:19', '2024-02-18 17:01:19', 1, 1);

-- --------------------------------------------------------

--
-- Structure de la table `tokenverifications`
--

CREATE TABLE `tokenverifications` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `expiresAt` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `tel` varchar(255) NOT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `credit` double DEFAULT NULL,
  `emailverif` tinyint(1) DEFAULT NULL,
  `numverif` tinyint(1) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `nom`, `email`, `tel`, `photo`, `credit`, `emailverif`, `numverif`, `password`, `createdAt`, `updatedAt`, `userId`) VALUES
(1, 'rodrigue', 'chocobami5@gmail.com', '681176708', 'upload/user/1708268873514.jpeg', 90, 0, 0, '$2b$10$lg/WB7JaLZsLeGHfbGpRne7x0hVx23gvbmy9823ZrJv5CwtYkxavm', '2024-02-18 15:07:53', '2024-02-18 17:01:20', NULL),
(2, 'choco', 'kamgarodrigue@gmail.com', '658136357', '', 0, 0, 0, '$2b$10$Dz9AtbgeRjP7QdQGK6ekv.UL48dIhSKjQ.f1yxA37XnvZWkH3Ol7C', '2024-02-18 15:12:44', '2024-02-18 15:12:44', NULL),
(3, 'ché\"\'\'\'(\"\"\'é12233\"', 'smartdev@gmail.com', '65813635\'', 'upload/user/1708269226429.jpeg', 0, 0, 0, '$2b$10$vQcHakmmB9gohzZAvHTtvOWY36FRxD.dwD1UOhKSdWqc5GRos904S', '2024-02-18 15:13:46', '2024-02-18 15:13:46', NULL);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `formules`
--
ALTER TABLE `formules`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `rapports`
--
ALTER TABLE `rapports`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Index pour la table `souscriptions`
--
ALTER TABLE `souscriptions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`),
  ADD KEY `formuleId` (`formuleId`);

--
-- Index pour la table `tokenverifications`
--
ALTER TABLE `tokenverifications`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`),
  ADD UNIQUE KEY `users_tel_unique` (`tel`),
  ADD KEY `userId` (`userId`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `formules`
--
ALTER TABLE `formules`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `rapports`
--
ALTER TABLE `rapports`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `souscriptions`
--
ALTER TABLE `souscriptions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `tokenverifications`
--
ALTER TABLE `tokenverifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `rapports`
--
ALTER TABLE `rapports`
  ADD CONSTRAINT `rapports_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Contraintes pour la table `souscriptions`
--
ALTER TABLE `souscriptions`
  ADD CONSTRAINT `souscriptions_ibfk_43` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `souscriptions_ibfk_44` FOREIGN KEY (`formuleId`) REFERENCES `formules` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Contraintes pour la table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
