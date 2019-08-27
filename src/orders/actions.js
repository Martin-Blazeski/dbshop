import database from '../database/mysql';
import Bluebird from 'bluebird';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const { con } = database;