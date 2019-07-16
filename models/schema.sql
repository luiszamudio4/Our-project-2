DROP DATABASE IF EXISTS testdb;
CREATE DATABASE testdb;

CREATE DATABASE crypter;
USE crypter;

CREATE TABLE users (
    id int AUTO_INCREMENT NOT NULL,
	name varchar(100) NOT NULL,
    password varchar(100) NOT NULL,
    usdBalance int,
	PRIMARY KEY(id)
);

CREATE TABLE coins (
    id int AUTO_INCREMENT NOT NULL,
	price int NOT NULL,
    coinRank int,
	PRIMARY KEY(id)
);

          
INSERT INTO users
    (username)
VALUES
    ('Dr. McGregor');

INSERT INTO users
    (password)
VALUES
    ('YaBabyMama123');

INSERT INTO users
    (usd_balance)
VALUES
    (32500);   

select * from users;
