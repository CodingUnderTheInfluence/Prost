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
});


barRouter.post('/', (req, res) => {
  const { bar_name, address, } = req.body;
  Bar.findOrCreate({
    where: {
      bar_name: 'test',
      phone_number: '123-456-7890',
      address: '1217 magazine st, New Orleans, LA 70043',
    }
  })
    .then((bar) => {
      res.status(201).send(bar);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// 
module.exports = {
  barRouter,
};