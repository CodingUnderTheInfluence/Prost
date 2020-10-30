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
})

customerRouter.get('/one/:customerId', (req, res) => {
  const {customerId} = req.params;
  Customer.findOne({
      where: {
        id: customerId,
      }
    })
    .then((rtn) => {
      res.send(rtn);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
  })

  module.exports = {
  customerRouter,
};