const usersCreateModel = `
  CREATE TABLE IF NOT EXISTS users (
    id INT NOT NULL AUTO_INCREMENT,
    firstName CHAR(25),
    lastName CHAR(25),
    username VARCHAR(50) NOT NULL,
    email VARCHAR(75) NOT NULL,
    password VARCHAR (64) NOT NULL,
    salt VARCHAR (64),
    created_at DATE,
    updated_at DATE,
    lastSignIn DATE,
    phonenumber VARCHAR (64) NOT NULL,
    PRIMARY KEY (id)
  )
`;



const ordersModel = `
CREATE TABLE IF NOT EXISTS orders(
    id INT(10) NOT NULL AUTO_INCREMENT,
    dateOrdered VARCHAR(25),
    PRIMARY KEY (id),
    userId INT(10),
    FOREIGN KEY (userId) REFERENCES users(id),
    itemsID INT(10),
    FOREIGN KEY (itemsID) REFERENCES items(id)
) 
`;

const itemsModel = `
CREATE TABLE IF NOT EXISTS items (
  id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(45) NOT NULL,
  price varchar(45) NOT NULL,
  item_company_id int(11) DEFAULT NULL,
  PRIMARY KEY (id)
) 
`;
const shopcartModel = `
CREATE TABLE IF NOT EXISTS shopcart (
  id int(11) NOT NULL AUTO_INCREMENT,
  shopCart_item_id int(11) NOT NULL,
  PRIMARY KEY (id)
) 
`;

const companyModel = `
CREATE TABLE IF NOT EXISTS company (
  id int(11) NOT NULL AUTO_INCREMENT,
  companyName varchar(45) NOT NULL,
  companyItems varchar(55) NOT NULL,
  PRIMARY KEY (id)
) 
`;

export default {
  usersCreateModel,
  ordersModel,
  itemsModel,
  shopcartModel,
  companyModel
}
