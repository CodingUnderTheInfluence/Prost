/* eslint-disable camelcase */
const { Sequelize } = require('sequelize');
require('dotenv').config();

const username = process.env.SEQUEL_USER;
const host = process.env.SEQUEL_HOST;
const database = process.env.SEQUEL_DATABASE;
const password = process.env.SEQUEL_PASS;
const port = process.env.SEQUEL_PORT;

const sequelize = new Sequelize(database, username, password, {
  host,
  dialect: 'postgres',
  port,
  logging: false,
});

const BarModel = require('./Bar');
const CustomerModel = require('./Customer');
const Customers_BarsModel = require('./Customers_Bars');
const eContactModel = require('./eContact');
const ImageModel = require('./Image');
const MenuModel = require('./Menu');
const MessageModel = require('./Message');
const OwnerModel = require('./Owner');
const Parties_CustomersModel = require('./Parties_Customers');
const PartyModel = require('./Party');
const RelationshipModel = require('./Relationship');
const ThreadModel = require('./Parties_Customers');

const Bar = BarModel(sequelize, Sequelize);
const Customer = CustomerModel(sequelize, Sequelize);
const Customers_Bars = Customers_BarsModel(sequelize, Sequelize);
const eContact = eContactModel(sequelize, Sequelize);
const Image = ImageModel(sequelize, Sequelize);
const Menu = MenuModel(sequelize, Sequelize);
const Message = MessageModel(sequelize, Sequelize);
const Owner = OwnerModel(sequelize, Sequelize);
const Parties_Customers = Parties_CustomersModel(sequelize, Sequelize);
const Party = PartyModel(sequelize, Sequelize);
const Relationship = RelationshipModel(sequelize, Sequelize);
const Thread = ThreadModel(sequelize, Sequelize);

const models = {
  Customer,
  Owner,
  eContact,
  Bar,
  Message,
  Image,
  Menu,
  Party,
  Relationship,
  Thread,
  Parties_Customers,
  Customers_Bars,
}

Object.keys(models).forEach((model) => {
  if (models[model].associate) {
    models[model].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;
module.exports = models;