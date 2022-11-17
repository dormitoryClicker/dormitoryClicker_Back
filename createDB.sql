DROP DATABASE IF EXISTS clicker;

CREATE DATABASE IF NOT EXISTS clicker
    DEFAULT CHARACTER SET utf8
    DEFAULT COLLATE utf8_general_ci;

Use clicker;

CREATE TABLE `machine` (
   `idMachine` int NOT NULL AUTO_INCREMENT,
   `dormitory` varchar(255) NOT NULL,
   `machineNum` varchar(255) NOT NULL,
   `canUse` tinyint(1) DEFAULT NULL,
   PRIMARY KEY (`idMachine`)
 ) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb3;
 
 CREATE TABLE `member` (
   `idMember` int NOT NULL AUTO_INCREMENT,
   `userId` varchar(255) NOT NULL,
   `password` varchar(255) NOT NULL,
   `userName` varchar(255) NOT NULL,
   `dormitory` varchar(255) NOT NULL,
   `canReservation` tinyint(1) DEFAULT NULL,
   PRIMARY KEY (`idMember`),
   UNIQUE KEY `userId` (`userId`)
 ) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb3;
 
 CREATE TABLE `reservation` (
   `idReservation` int NOT NULL AUTO_INCREMENT,
   `member_userId` varchar(255) DEFAULT NULL,
   `machine_idMachine` int DEFAULT NULL,
   `start` datetime NOT NULL,
   `end` datetime NOT NULL,
   PRIMARY KEY (`idReservation`),
   KEY `member_userId` (`member_userId`),
   KEY `reservation_ibfk_2` (`machine_idMachine`),
   CONSTRAINT `reservation_ibfk_1` FOREIGN KEY (`member_userId`) REFERENCES `member` (`userId`),
   CONSTRAINT `reservation_ibfk_2` FOREIGN KEY (`machine_idMachine`) REFERENCES `machine` (`idMachine`)
 ) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb3;

 insert into machine(dormitory, machineNum) values('푸름1', 'W1');
insert into machine(dormitory, machineNum) values('푸름1', 'W2');
insert into machine(dormitory, machineNum) values('푸름1', 'W3');
insert into machine(dormitory, machineNum) values('푸름1', 'W4');
insert into machine(dormitory, machineNum) values('푸름1', 'D1');
insert into machine(dormitory, machineNum) values('푸름1', 'D2');

insert into machine(dormitory, machineNum) values('푸름2', 'W1');
insert into machine(dormitory, machineNum) values('푸름2', 'W2');
insert into machine(dormitory, machineNum) values('푸름2', 'W3');
insert into machine(dormitory, machineNum) values('푸름2', 'W4');
insert into machine(dormitory, machineNum) values('푸름2', 'D1');
insert into machine(dormitory, machineNum) values('푸름2', 'D2');

insert into machine(dormitory, machineNum) values('푸름3', 'W1');
insert into machine(dormitory, machineNum) values('푸름3', 'W2');
insert into machine(dormitory, machineNum) values('푸름3', 'W3');
insert into machine(dormitory, machineNum) values('푸름3', 'W4');
insert into machine(dormitory, machineNum) values('푸름3', 'D1');
insert into machine(dormitory, machineNum) values('푸름3', 'D2');

insert into machine(dormitory, machineNum) values('푸름4', 'W1');
insert into machine(dormitory, machineNum) values('푸름4', 'W2');
insert into machine(dormitory, machineNum) values('푸름4', 'W3');
insert into machine(dormitory, machineNum) values('푸름4', 'W4');
insert into machine(dormitory, machineNum) values('푸름4', 'D1');
insert into machine(dormitory, machineNum) values('푸름4', 'D2');

insert into machine(dormitory, machineNum) values('오름1', 'W1');
insert into machine(dormitory, machineNum) values('오름1', 'W2');
insert into machine(dormitory, machineNum) values('오름1', 'W3');
insert into machine(dormitory, machineNum) values('오름1', 'W4');
insert into machine(dormitory, machineNum) values('오름1', 'D1');
insert into machine(dormitory, machineNum) values('오름1', 'D2');

insert into machine(dormitory, machineNum) values('오름2', 'W1');
insert into machine(dormitory, machineNum) values('오름2', 'W2');
insert into machine(dormitory, machineNum) values('오름2', 'W3');
insert into machine(dormitory, machineNum) values('오름2', 'W4');
insert into machine(dormitory, machineNum) values('오름2', 'D1');
insert into machine(dormitory, machineNum) values('오름2', 'D2');

insert into machine(dormitory, machineNum) values('오름2', 'W1');
insert into machine(dormitory, machineNum) values('오름2', 'W2');
insert into machine(dormitory, machineNum) values('오름2', 'W3');
insert into machine(dormitory, machineNum) values('오름2', 'W4');
insert into machine(dormitory, machineNum) values('오름2', 'D1');
insert into machine(dormitory, machineNum) values('오름2', 'D2');