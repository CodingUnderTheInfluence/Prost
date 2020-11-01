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
const pcRouter = Router();

pcRouter.get('/', (req, res) => {
  Parties_Customers.findAll()
    .then((pcs) => {
      res.send(pcs);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});



module.exports = {
  pcRouter,
};