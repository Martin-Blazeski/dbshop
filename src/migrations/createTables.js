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
  CREATE TABLE IF NOT EXISTS orderscart (
  customer_id int(11) NOT NULL,
  items_id int(11) NOT NULL,
   PRIMARY KEY (customer_id),
 FOREIGN KEY (customer_id) REFERENCES users (id) ON DELETE NO ACTION ON UPDATE NO ACTION
  
) 
`;

const itemsModel = `
CREATE TABLE IF NOT EXISTS items (
  id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(45) NOT NULL,
  price varchar(45) NOT NULL,
  item_company_id int(11) DEFAULT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (item_company_id) REFERENCES company (id) ON DELETE NO ACTION ON UPDATE NO ACTION
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
