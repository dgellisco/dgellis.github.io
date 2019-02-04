-- seeds file is used to insert intial values
USE burgers_db;

INSERT INTO burgers (burger_name, devoured)
VALUES ("Double-Beef Burger", false),
("Quarter-Pounder Burger", false),
("Already Eaten Burger", true),
("All Time Burger", false);

SELECT * FROM burgers;