const { Router } = require('express');
const { Op } = require('sequelize');
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
} = require('../db/models/dbindex.js');

const menuRouter = Router();

menuRouter.get('/', (req, res) => {
  Menu.findAll()
    .then((menus) => {
      res.send(menus);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

menuRouter.get('/bar/:barId', (req, res) => {
  const { barId } = req.params;
  Menu.findAll({
    where: {
      id_bar: barId,
    },
  })
    .then((menus) => (menus.length > 0 ? res.send(menus) : res.send('Empty')))
    .catch((err) => {
      res.status(500).send(err);
    });
});

menuRouter.post('/bar', (req, res) => {
  const { barId, info } = req.body;
  // res.send({ barId, info })
  Menu.findOrCreate({
    where: {
      // eslint-disable-next-line quote-props
      'id_bar': barId,
      info,
    },
  })
    .then((menus) => res.send(menus))
    .catch((err) => {
      res.status(500).send(err);
    });
});

//
module.exports = {
  menuRouter,
};
