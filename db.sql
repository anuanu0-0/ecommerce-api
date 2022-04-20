create database ecommerce_dev;

\c ecommerce_dev

CREATE TYPE ProductEnum as ENUM('ACTIVE','INACTIVE','DRAFT','READY_FOR_LISTING');
CREATE TYPE OrderEnum as ENUM('ACTIVE', 'INACTIVE', 'PROCESSED', 'RETURN', 'EXCHANGE', 'REFUND');
CREATE TYPE UserRole as ENUM('SHOPPER', 'VENDOR', 'ADMIN');

CREATE TABLE IF NOT EXISTS products(
    id SERIAL PRIMARY KEY,
    status ProductEnum DEFAULT 'DRAFT',
    title VARCHAR (500) NOT NULL,
    picture_url VARCHAR(500),
    price integer NOT NULL,
    created_by integer NOT NULL
);

CREATE TABLE IF NOT EXISTS orders(
    id SERIAL PRIMARY KEY,
    status OrderEnum DEFAULT 'ACTIVE',
    items integer [],
    total_price integer DEFAULT 0,
    created_by integer NOT NULL
);

CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(400) NOT NULL,
    email VARCHAR ( 255 ) UNIQUE NOT NULL,
    password VARCHAR ( 400 ) NOT NULL,
    roles UserRole DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS games(
   id SERIAL PRIMARY KEY,
    name VARCHAR(45) NOT NULL
);