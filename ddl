SET GLOBAL time_zone='+09:00';
SET time_zone='+09:00';
SET foreign_key_checks = 0;
SET NAMES utf8mb4;
SET GLOBAL character_set_server = utf8mb4;

CREATE DATABASE `KARIN`;

DROP TABLE IF EXISTS `KARIN`.`KC_CONTACTS`;

CREATE TABLE `KARIN`.`KC_CONTACTS` (
  `KC_IDX` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `KC_NAME` varchar(40) NOT NULL,
  `KC_PHONE` varchar(30) NOT NULL,
  `KC_EMAIL` varchar(40) DEFAULT NULL,
  `KC_BIRTHDAY` date DEFAULT NULL,
  `KC_GROUP` varchar(20) DEFAULT NULL,
  `KC_VERSION` int(10) DEFAULT 1 NOT NULL,
  PRIMARY KEY (`KC_IDX`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

INSERT INTO `KARIN`.`KC_CONTACTS` (`KC_NAME`, `KC_PHONE`, `KC_EMAIL`, `KC_BIRTHDAY`) VALUES ('Evelyn', '01077112349', 'evelyn49@gmail.com', '2001-06-06');
INSERT INTO `KARIN`.`KC_CONTACTS` (`KC_NAME`, `KC_PHONE`, `KC_GROUP`) VALUES ('Amy', '01043534009', 'family');
INSERT INTO `KARIN`.`KC_CONTACTS` (`KC_NAME`, `KC_PHONE`, `KC_EMAIL`) VALUES ('Chris', '01099334992', 'chris92@gmail.com');
INSERT INTO `KARIN`.`KC_CONTACTS` (`KC_NAME`, `KC_PHONE`, `KC_EMAIL`, `KC_GROUP`) VALUES ('David', '01022315435', 'david35@gmail.com', 'work');
INSERT INTO `KARIN`.`KC_CONTACTS` (`KC_NAME`, `KC_PHONE`, `KC_BIRTHDAY`, `KC_GROUP`) VALUES ('Anne', '01060503049', '19980808', 'work');
INSERT INTO `KARIN`.`KC_CONTACTS` (`KC_NAME`, `KC_PHONE`, `KC_BIRTHDAY`, `KC_GROUP`) VALUES ('Emma', '01059436566', '2001-1-1', 'friend');
INSERT INTO `KARIN`.`KC_CONTACTS` (`KC_NAME`, `KC_PHONE`, `KC_BIRTHDAY`) VALUES ('Christine', '01054540122', '1999.12.12');
INSERT INTO `KARIN`.`KC_CONTACTS` (`KC_NAME`, `KC_PHONE`, `KC_EMAIL`, `KC_GROUP`) VALUES ('Ben', '01056347688', 'ben88@gmail.com', 'friend');
INSERT INTO `KARIN`.`KC_CONTACTS` (`KC_NAME`, `KC_PHONE`, `KC_GROUP`) VALUES ('Clara', '01089331102', 'friend');