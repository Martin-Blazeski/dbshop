import database from '../database/mysql';
import Bluebird from 'bluebird';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const { con } = database;

function listAllItems() {
  const allItems = "SELECT * FROM items";
  return new Promise((resolve, reject) => {
    con.query(allItems, (err, results) => {
      if(err) {
        reject(err);
        console.error(err);
      } else {
        resolve(results);
      }
    });
  });
};

const list = async(req, res, next) => {
  try {
    const items = await listAllItems();
    res.status(200).send({success: true, message: "A list of all items in the store", body: items});
  } catch(err) {
    res.status(500).send({success: false, message: "Failed to fetch the list of items"});
  }
  await next;
};

function listSingleItem(id) {
  const singleItem = "SELECT * FROM items WHERE id = ?";
  return new Promise((resolve, reject) => {
    con.query(singleItem, [id], (err, results) => {
      if(err) {
        reject(err);
        console.error(err);
      } else {
        resolve(results);
      }
    });
  });
}

const listOne = async(req, res, next) => {
  const id = req.params.id;
  try{
    const oneItem = await listSingleItem(id);
    res.status(201).send({success: true, message: `Showing one item with ID: ${id}`, body: oneItem});
  } catch(err) {
    res.status(500).send({success: false, message: "Failed to get item"});
  }
  await next;
}

function createNewItem(name, price, location) {
  const createItemsQuery = "INSERT INTO items (name, price, company) VALUES (?, ?, ?)";
  return new Promise((resolve, reject) => {
    con.query(createItemsQuery, [name, price, location], (err, results) => {
      if(err) {
        reject(err);
        console.error(err);
      } else {
        resolve(results);
      }
    });
  });
};

const create = async(req, res, next) => {
  const name = req.body.name;
  const price = req.body.price;
  const location = req.body.location;

  try {
    const newItem = await createNewItem(name, price, location);
    res.status(201).send({success: true, message: "New items has been added to the store", body: {name, price, company}});
  } catch(err) {
    res.status(404).send({success: false, message: err.message});
  }
};

function deleteItem(id) {
  const deletingItem = "DELETE FROM items where id = ?";
  return new Pomise((resolve, reject) => {
    con.query(deletingItem, [id], (err, results) => {
      if(err) {
        reject(err);
        console.error(err);
      } else {
        resolve(results);
      }
    });
  });
};

const erase = async(req, res, next) => {
  const id = req.params.id;
  try {
    const deletedItem = await deleteItem(id);
    res.status(201).send({success: true, message: `Item with the ID: ${id} has been deleted from the store`});
  } catch(err) {
    res.status(403).send({success: false, message: `Unable to delete item with ID: ${id}`});
  }
};

module.exports = {
    list,
    listOne,
    create,
    erase
};