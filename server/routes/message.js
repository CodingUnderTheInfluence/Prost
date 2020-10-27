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
const messageRouter = Router();

messageRouter.get('/', (req, res) => {
  Message.findAll()
  .then((messages) => {
    res.send(messages);
  })
  .catch((err) => {
    res.status(500).send(err);
  });
})

  // 
module.exports = {
  messageRouter,
};