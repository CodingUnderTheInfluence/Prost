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
const menuRouter = Router();

menuRouter.get('/', (req, res) => {
  Menu.findAll()
  .then((menus) => {
    res.send(menus);
  })
  .catch((err) => {
    res.status(500).send(err);
  });
})

  // 
module.exports = {
  menuRouter,
};