const {
  Customer,
  Owner,
  EContact,
  Bar,
  Message,
  Image,
  Menu,
  Party,
  Friendship,
  Thread,
  Parties_Customers,
  Customers_Bars,
} = require('../db/models/dbindex.js');
const { Router } = require('express');
const { Op } = require('sequelize');
const friendshipRouter = Router();

friendshipRouter.get('/', (req, res) => {
  Friendship.findAll()
  .then((friendships) => {
    res.send(friendships);
  })
  .catch((err) => {
    res.status(500).send(err);
  });
})

  // 
module.exports = {
  friendshipRouter,
};