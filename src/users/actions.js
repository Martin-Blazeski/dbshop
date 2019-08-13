import database from '../database/mysql';
import Bluebird from 'bluebird';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const { con } = database;

Bluebird.promisifyAll(jwt);
Bluebird.promisifyAll(bcrypt);


const listUserPosts = async (req, res, next) => {
  const { userId }: { userId: string } = req.params;
  
  // innerJoin from /src/migrations/queriesSql
  await next;
}

const get = async(req, res, next) => {
  const { id }: { id: string } = req.params;
  // const id = req.params.id;
  const listingUsersQuery = 'SELECT * FROM users';
  // let usersIds;
  return con.query(listingUsersQuery, (err, results) => {
    if (err) {
      console.error(err);
    }
    const users = results;
    const usersIds = users.map(user => user.id);

    if (usersIds.includes(Number(id))) {
      const querySelectUsersById = 'SELECT * FROM users WHERE id = ?';
    
      return con.query(querySelectUsersById, [Number(id)], (err, results, fields) => {
        if (err) {
          console.error(err);
        }
        res.status(200).send(results);
      });
    } else {
      res.status(404).send(`Id ${id} is not valid/exists. :( Please try again :B`);
    }
  });

  await next;
}

const list = async(req, res, next) => {
  const listingUsers = 'SELECT * FROM users'
  return con.query(listingUsers, (err, results, fields) => {
    if (err) {
      throw err;
    }
    // const users = results.map(user => user.id == id);
    res.status(200).send(results);
  });
  await next;
}

async function create(req, res, next) {
  const {
    firstName,
    lastName,
    username,
    email,
    password,
    phoneNumber
  }: {
    firstName: ?string,
    lastName: ?string,
    username: string,
    email: string,
    password: string,
    phoneNumber:string
  } = req.body;

  const salt = bcrypt.genSaltSync(10);
  const getRounds = bcrypt.getRounds(salt);
  const passHash = bcrypt.hashSync(password, getRounds);

  const createAt = new Date(Date.now());
  const addQuery = `INSERT INTO users (firstName, lastName, username, email, password, salt, phonenumber, created_at) VALUES (?, ?, ?, ?, ?, ?, ?,?)`
  return con.query(addQuery, [firstName, lastName, username, email, passHash,  salt, phoneNumber,  createAt], (err, results) => {
    if (err) {
      console.error(err)
    }
    res.status(201).send({ data: { firstName, lastName, username, email, password, phoneNumber }})
  });

  await next;
}

const update = async(req, res, next) => {
  const { id }: { id: string } = req.params;
  const {
    firstName,
    lastName,
    username,
    email,
    password,
    phoneNumber
  }: {
    firstName: ?string,
    lastName: ?string,
    username: string,
    email: string,
    password: ?string,
    phoneNumber: string
  } = Object.assign({}, req.body);

  const userId = req.body.id;
  if (userId) {
    res.status(403).send(`Id ${id} should not be overwritten`);
  } else {
    if (password && password.length) {
      const salt = bcrypt.genSaltSync(10);
      const getRounds = bcrypt.getRounds(salt);
      const passHash = bcrypt.hashSync(password, getRounds);
      
      const updateUserQuery = 'UPDATE users SET firstName = ?, lastName = ?, username = ?, email = ?, password = ? WHERE id = ?'
      return con.query(updateUserQuery, [firstName, lastName, username, email, passHash, Number(id)], (err, results) => {
        if (err) {
          console.error(err);
        }
        res.status(204).send(results);
      });
    
    } else {
      res.status(404).send('You must to have password');
    }
  }
  await next;
}


//diff between function and arrow fun
//what is local scope, what is global scope
// diff between local and global scope

async function del(req, res, next) {
  const { id }: { id: string } = req.params;
  const deleteUserByIdQuery = 'DELETE FROM users WHERE id = ?';
  return con.query(deleteUserByIdQuery, parseInt(id), (err, results) => {
    if (err) {
      console.error(err);
    }
    res.status(202).send(`Users with id ${id} is removed`);
  });

  await next;
}

const login = async(req, res, next) => {
  const { email, password }: { email: string, password: string } = req.body;
  
  const userWithEmail = 'SELECT * FROM users WHERE email = ?';
  return con.query(userWithEmail, email, (err, results) => {
    if (err) {
      console.error(err);
    }
    const user = results.find(emailObj => emailObj.email === email);

    if (results && results.length && user.email) {
      const matchPassword: boolean = bcrypt.compareSync(password, user.password);
      if (matchPassword) {
        // const newuserdata = {
        //   firstName: user.firstName,
        //   lastName: user.lastName,
          
        // }
        delete user.password;
        delete user.salt;
        console.log('User', user);
        const userId = user.id;
        const token = jwt.sign({ user }, 'aaaa', { expiresIn: '1h'});

        res.status(200).send({message: 'Logged in', token: token});
      } else {
        res.status(403).send('Password is not correct');
      }
    } else {
      res.status(404).send(`User with email ${email} not found!`);
    }
  });
  // res.status(200);

  await next;
}
export default {
  create,
  list,
  get,
  del,
  update,
  login,
  listUserPosts,
}