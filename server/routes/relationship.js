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
const relationshipRouter = Router();

relationshipRouter.get('/', (req, res) => {
  Relationship.findAll()
  .then((relationships) => {
    res.send(relationships);
  })
  .catch((err) => {
    res.status(500).send(err);
  });
})

  // 
module.exports = {
  relationshipRouter,
};