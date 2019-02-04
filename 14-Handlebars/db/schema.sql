-- Schema to create database and set column fields
DROP DATABASE IF EXISTS burgers_db;
CREATE DATABASE burgers_db;

USE burgers_db;

CREATE TABLE burgers (
    -- primary key, auto-incrementing id
    id INT NOT NULL AUTO_INCREMENT,
    -- name of burger
    burger_name VARCHAR(100) NOT NULL,
    -- create devoured column, values of type Boolean(true/false), default value is false, but can be changed to true
    devoured BOOLEAN DEFAULT false,
    -- set the primary key
    PRIMARY KEY (id)
);