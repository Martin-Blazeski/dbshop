import database from '../database/mysql';
import Bluebird from 'bluebird';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


const { con } = database;


function listAllCartItems() {
    listAllOrdersQuery = "SELECT * FROM orders";
    return new Promise((resolve, reject) => {
        con.query(listAllOrdersQuery, (err, results) => {
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
    try{
        const allOrders = await listAllCartItems();
        res.status(200).send({success: true, message: "A list of all orders in the shop", body: allOrders});
    } catch(err) {
        res.status(503).send({success: false, message: "Cannot get orders list"});
    }
    await next;
};

function listSingleCartItem(id) {
    const singleCartQuery = "SELECT users.firstName, users.lastName, users.username, users.email, paymentCards.cardHolder, paymentCards.cardNumber, cart.dateInserted, items.name FROM users INNER JOIN paymentCards ON users.id = paymentCards.userID INNER JOIN cart ON users.id = cart.userID INNER JOIN items ON items.id = cart.itemsID WHERE users.id = ?";
    return new Promise((resolve, reject) => {
        con.query(singleCartQuery, [id], (err, results) => {
            if(err) {
                reject(err);
                console.error(err);
            } else {
                resolve(results);
            }
        });
    });
};

const listOne = async(req, res, next) => {
    const id = req.params.id;

    try{
        const singleCartItem = await listSingleCartItem(id);
        res.status(201).send({success: true, message: `listig the cart items for user with ID ${id}`, body: singleCartItem});
    } catch(err) {
        res.status(404).send(err.message);
    }
    await next;
};

function insertToCart(dateInserted, userID, itemsID) {
    const makingOrderQuery = "INSERT INTO orders (dateOrdered, userId, itemsID) VALUES (?, ?, ?)"
    return new Promise((resolve, reject) => {
        con.query(makingOrderQuery, [dateInserted, userID, itemsID], (err, results) => {
            if(err) {
                reject(err);
                console.error(err);
            } else {
                resolve(results)
            }
        });
    });
};

const create = async(req, res, next) => {
    console.log(req.params)
    const dateInserted = new Date(Date.now());
    const userID = req.params.userId;
    const itemsID = req.params.itemId;
    try{
        const newOrder = await insertToCart(dateInserted, userID, itemsID);
        res.status(200).send({success: true, message: "New items have been added to the cart", body: newOrder});
    } catch(err) {
        res.status(401).send({success: false, message: err.message});
    }
};

function deleteFromCart(userID) {
    const deleteItemQuery = "DELETE FROM order WHERE userID = ?";
    return new Promise((resolve, reject) => {
        con.query(deleteItemQuery, [userID], (err, results) => {
            if(err) {
                reject(err);
                console.error(err);
            } else {
                resolve(results)
            }
        });
    });
};

const erase = async(req, res, next) => {
    const userID = req.params.userID;
    try {
        const deletedCartItem = await deleteFromCart(userID);
        res.status(201).send({success: true, message: `The cart items from user with user ID ${userID} have been deleted`});
    } catch(err) {
        res.status(401).send({success: false, message: "Unable to delete cart items"});
    }
    await next;
};

function makingOrder(dateOrdered, userID, paymentCardsID, itemsID, cartID) {
    const orderingQuery = "INSERT INTO orders (dateOrdered, userID, paymentCardsID, itemsID, cartID) VALUES (?, ?, ?, ?, ?)";
    return new Promise((resolve, reject) => {
        con.query(orderingQuery, [dateOrdered, userID, paymentCardsID, itemsID, cartID], (err, results) => {
            if(err) {
                reject(err);
                console.error(err);
            } else {
                resolve(results);
            }
        });
    });
};

const newOrder = async(req, res, next) => {
    const dateOrdered = new Date(Date.now());
    const userID = req.params.userID;
    const paymentCardsID = req.body.paymentCardsID;
    const itemsID = req.body.itemsID;
    const cartID = req.body.cartID;

    try{
        const newOrder = await makingOrder(dateOrdered, userID, paymentCardsID, itemsID, cartID);
        // const deleteCartItem = await deleteFromCart(userID);
        res.status(201).send({success: true, message: "The order have been placed with the items in the cart", body: newOrder});
    } catch(err) {
        res.status(401).send({success: false, message: "Error!!! The order hasn't been placed"})
    }
    await next;
};

module.exports = {
    list,
    listOne,
    create,
    erase,
    newOrder
};