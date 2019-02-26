-- create database devtest and setup tables
-- this script should run by root only
CREATE USER IF NOT EXISTS 'worker'@'%' IDENTIFIED BY 'worker';
GRANT ALL PRIVILEGES ON *.* TO 'worker'@'%';
FLUSH PRIVILEGES;
CREATE DATABASE IF NOT EXISTS dev;
USE dev;
CREATE TABLE IF NOT EXISTS users (
  id            VARCHAR(36) NOT NULL,
  first_name    VARCHAR(60),
  last_name     VARCHAR(60),
  email         VARCHAR(256) NOT NULL,
  img_url       VARCHAR(256),
  subscribe     INT NOT NULL,
  PRIMARY KEY (id)
);
DELIMITER ;;
CREATE TRIGGER `users_before_insert`
BEFORE INSERT ON `users` FOR EACH ROW
BEGIN
  IF new.id IS NULL THEN
    SET new.id = uuid();
  END IF;
END;;
