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
const ownerRouter = Router();

ownerRouter.get('/', (req, res) => {
  Owner.findAll()
  .then((owners) => {
    res.send(owners);
  })
  .catch((err) => {
    res.status(500).send(err);
  });
})

  // 
module.exports = {
  ownerRouter,
};