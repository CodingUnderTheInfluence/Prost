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
const cbRouter = Router();

cbRouter.get('/', (req, res) => {
  Customers_Bars.findAll()
  .then((cbs) => {
    res.send(cbs);
  })
  .catch((err) => {
    res.status(500).send(err);
  });
})

  // 
module.exports = {
  cbRouter,
};