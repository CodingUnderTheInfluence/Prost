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
const barRouter = Router();

barRouter.get('/', (req, res) => {
  Bar.findAll()
  .then((bars) => {
    res.send(bars);
  })
  .catch((err) => {
    res.status(500).send(err);
  });
})

module.exports = {
  barRouter,
};