DROP DATABASE braindance;

CREATE DATABASE braindance;

USE braindance;

CREATE TABLE `User` (
	`id` int AUTO_INCREMENT PRIMARY KEY,
	`uid` varchar(255) NOT NULL,
	`createdAt` datetime NOT NULL
);

ALTER TABLE `user` ADD INDEX `idx_uid` (`uid`);

CREATE TABLE `Project` (
	`id` int AUTO_INCREMENT PRIMARY KEY,
	`projectTitle` varchar(255) NOT NULL,
	`createdAt`	datetime NOT NULL,
	`originText` LONGTEXT NOT NULL,
	`summaryText` LONGTEXT NULL,
    `keywords` LONGTEXT NULL,
	`uid` varchar(255) NOT NULL
);


ALTER TABLE `Project` ADD CONSTRAINT `FK_User_TO_Project_1` FOREIGN KEY (
	`uid`
)
REFERENCES `user` (
	`uid`
);

CREATE TABLE `Quiz` (
	`id` int AUTO_INCREMENT PRIMARY KEY,
	`quizQuestion` LONGTEXT NOT NULL,
	`quizAnswer` LONGTEXT NOT NULL,
	`quizComment` LONGTEXT NOT NULL,
	`project_id` int NOT NULL
);

ALTER TABLE `Quiz` ADD CONSTRAINT `FK_Project_TO_Quiz_1` FOREIGN KEY (
	`project_id`
)
REFERENCES `Project` (
	`id`
);


GRANT ALL PRIVILEGES ON braindance_db.* TO 'root'@'%';

flush privileges;

use mysql;

select user, host from user;
