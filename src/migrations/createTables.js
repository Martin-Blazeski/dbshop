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


const postsCreateModel = `
  CREATE TABLE IF NOT EXISTS posts (
    id INT(11) NOT NULL AUTO_INCREMENT,
    userId INT DEFAULT 10,
    text VARCHAR(400),
    likes INT,
    comments INT,
    PRIMARY KEY (id),
    FOREIGN KEY (userId) REFERENCES users(id)
  )
`

export default {
  usersCreateModel,
  postsCreateModel,
}
