const {
  Customer,
  Owner,
  EContact,
  Bar,
  Message,
  Image,
  Menu,
  Party,
  Relationship,
  Thread,
  Parties_Customers,
  Customers_Bars,
} = require('../../server/db/models/dbindex.js');
const { Router } = require('express');
const { Op } = require('sequelize');
const customerRouter = Router();

customerRouter.get('/', (req, res) => {
  Customer.findAll()
    .then((customers) => {
      res.send(customers);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

customerRouter.get('/:first_name', (req, res) => {
  const { first_name } = req.params;
  Customer.findAll({ where: { first_name } })
    .then((customer) => {
      customer.length > 0
        ? res.send(customer) : res.status(404).send('not in database');
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

// 
module.exports = {
  customerRouter,
};