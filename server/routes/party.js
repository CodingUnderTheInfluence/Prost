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
});

partyRouter.get('/:id_bar', (req, res) => {
  const { id_bar } = req.params
  Party.findAll({
    where: { id_bar: id_bar }
  })
    .then((bar) => {
      res.send(bar);
    })
    .catch((err) => {
      res.status(500).send(err);
    })
});

partyRouter.post('/create', (req, res) => {
  const { id_bar, size } = req.body;
  Party.findOrCreate({
    where: {
      id_bar: id_bar,
      size: size
    }
  })
    .then((party) => {
      res.status(201).send(party);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

module.exports = {
  partyRouter,
};