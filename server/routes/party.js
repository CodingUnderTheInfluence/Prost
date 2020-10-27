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
const partyRouter = Router();

partyRouter.get('/', (req, res) => {
  Party.findAll()
  .then((partys) => {
    res.send(partys);
  })
  .catch((err) => {
    res.status(500).send(err);
  });
})

  // 
module.exports = {
  partyRouter,
};