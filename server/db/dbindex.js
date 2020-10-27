/* eslint-disable camelcase */
const { Sequelize } = require('sequelize');
require('dotenv').config();
const { something } = require('./models')

const user = process.env.DB_USERNAME;
const host = process.env.DB_HOST;
const database = process.env.DB_DBNAME;
const password = process.env.DB_PASSWORD;
const port = process.env.DB_PORT;

const sequelize = new Sequelize(database, user, password, {
  host,
  dialect: 'postgres',
  port,
  logging: false,
});
console.log(something);
