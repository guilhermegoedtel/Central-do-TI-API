CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `user` varchar(50) NOT NULL,
  `password` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

ALTER TABLE `users` ADD PRIMARY KEY (`id`);

INSERT INTO `users` (`name`, `user`, `password`) VALUES ('Guilherme Goedtel', 'guilherme.goedtel', 'ee28695072368af3a4c8ee6e8c45cf3d');