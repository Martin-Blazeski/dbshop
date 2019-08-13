import mysql from 'mysql';
import mysqlConfigs from '../../config/mysql';
import models from '../migrations/createTables';
// import { userInfo } from 'os';

const dbConfig = mysqlConfigs['dev'];
const { usersCreateModel, ordersModel, itemsModel, shopcartModel } = models;
const con = mysql.createConnection(dbConfig);


con.connect(() => {
console.log('db connection is on');
con.query(usersCreateModel);
con.query(ordersModel);
con.query(itemsModel);
con.query(shopcartModel);
});

export default { con };