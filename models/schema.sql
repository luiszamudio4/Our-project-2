DROP DATABASE IF EXISTS crypter;
CREATE DATABASE crypter;
USE crypter;

-- ------------- CREATE TABLE user:
CREATE TABLE user
(
    id int
    AUTO_INCREMENT NOT NULL,
    email varchar
    (120) NOT NULL,
	username varchar
    (100) NOT NULL,
    password varchar
    (100) NOT NULL,
    usdBalance int,
    coinsOwned int,
	PRIMARY KEY
    (id)
);

    -- ------------- CREATE TABLE coin:
    CREATE TABLE coin
    (
        id int
        AUTO_INCREMENT NOT NULL,
	usd_price int NOT NULL,
    coin_rank int,
	PRIMARY KEY
        (id)
);


        -- ------------- INSERT INTO user table:
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

        -- ------------- INSERT INTO coin table:
        INSERT INTO coin
            (price)
        VALUES
            ('Dr. McGregor');

        INSERT INTO coin
            (coin_rank)
        VALUES
            ('YaBabyMama123');

        INSERT INTO coin
            (username)
        VALUES
            ('Dr. Baggio');

        -- ------------- SELECT all:
        select *
        from user;
        select *
        from coin;
