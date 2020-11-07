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

const barRouter = Router();

barRouter.get('/all', (req, res) => {
  Bar.findAll()
    .then((bar) => {
      res.status(200).send(bar);
    })
    .catch((err) => {
      res.status(500).send('error in get bar');
    });
});

barRouter.get('/', (req, res) => {
  const { bar_name } = req.query;
  Bar.findAll({
    where: {
      bar_name,
    },
  })
    .then((bar) => {
      if (bar.length) {
        res.send(bar);
      } else {
        res.send(null);
      }
    })
    .catch(() => {
      res.status(500).send('error in get bar');
    });
});

barRouter.get('/parties', (req, res) => {
  const { id_bar } = req.query;
  Bar.findAll({
    where: {
      id: id_bar,
    },
  })
    .then((bar) => {
      if (bar.length) {
        res.send(bar);
      } else {
        res.send(null);
      }
    })
    .catch(() => {
      res.status(500).send('error in get bar');
    });
});

barRouter.post('/create', (req, res) => {
  const {
    ownerId,
    barName,
    address,
    city,
    state,
    zip,
    number,
  } = req.body.bparams;
  console.log(req.body.bparams, 'BAR PARAMS')
  Bar.findOrCreate({
    where: {
      id_owner: ownerId,
      bar_name: barName,
      address,
      city,
      state,
      zip,
      phone_number: number,
    },
  })
    .then((bar) => {
      res.status(201).send(bar);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

module.exports = {
  barRouter,
};
