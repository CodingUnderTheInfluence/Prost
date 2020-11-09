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
      bar_name: bar_name,
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
    lat,
    lng
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
      latitude: lat,
      longitude: lng
    },
  })
    .then((bar) => {
      res.status(201).send(bar);
    })
    .catch(() => {
      res.status(500).send('error in bar create');
    });
});

barRouter.post('/id', (req, res) => {
  const { email, password } = req.body.params;
  Owner.findAll({ where: { email: email } })
    .then((owner) => {
      if (owner.length > 0) {
        Bar.findAll({ where: { id_owner: owner[0].id } })
          .then((bar) => {
            res.send(bar)
          })
      }
    })
})

module.exports = {
  barRouter,
};
