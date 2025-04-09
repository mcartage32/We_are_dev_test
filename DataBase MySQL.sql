CREATE DATABASE IF NOT EXISTS `we_are_dev_test`;
USE `we_are_dev_test`;

CREATE TABLE IF NOT EXISTS `elevator_status` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `current_floor` INT NOT NULL DEFAULT 0,
  `is_moving` BOOLEAN NOT NULL DEFAULT FALSE,
  `doors_open` BOOLEAN NOT NULL DEFAULT FALSE,
  `direction` ENUM('up', 'down', 'idle') DEFAULT 'idle',
  `last_updated` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `elevator_queue` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `floor` INT NOT NULL,
  `request_time` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `status` ENUM('pending', 'in_progress', 'completed') DEFAULT 'pending',
  `completed_time` TIMESTAMP NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `elevator_log` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `event_type` ENUM('call', 'arrival', 'door_open', 'door_close', 'start', 'stop') NOT NULL,
  `floor` INT NULL,
  `details` VARCHAR(255) NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);
