DROP DATABASE IF EXISTS testdb;
CREATE DATABASE testdb;

CREATE DATABASE crypter;
USE crypter;

CREATE TABLE user (
    id int AUTO_INCREMENT NOT NULL,
	username varchar(100) NOT NULL,
    password varchar(100),
    usd_balance int,
    coins_owned int,
	PRIMARY KEY(id)
);

CREATE TABLE coin (
    id int AUTO_INCREMENT NOT NULL,
	price int NOT NULL,
    coin_rank int,
    username varchar(50) NOT NULL,
	PRIMARY KEY(id)
);

          
INSERT INTO user
    (username)
VALUES
    ('Dr. McGregor');

INSERT INTO user
    (password)
VALUES
    ('YaBabyMama123');

INSERT INTO user
    (usd_balance, coins_owned)
VALUES
    (32500, 2);   

select * from user
