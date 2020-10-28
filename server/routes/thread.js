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
const threadRouter = Router();

threadRouter.get('/', (req, res) => {
  Thread.findAll()
  .then((threads) => {
    res.send(threads);
  })
  .catch((err) => {
    res.status(500).send(err);
  });
})

  // 
module.exports = {
  threadRouter,
};