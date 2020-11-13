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

barRouter.get('/currentOcc/:bar', (req, res) => {
  const { bar } = req.params;
  Customers_Bars.findAll({
    where: { id_bar: bar },
  })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send('error in current bar customers GET');
    });
});

barRouter.get('/parties', (req, res) => {
  const { id } = req.query;
  Bar.findAll({
    where: {
      id,
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
    lng,
    image,
    capacity,
  } = req.body.bparams;
  Bar.findAll({ where: { id_owner: ownerId } })
    .then((bar) => {
      if (bar.length > 0) {
        res.status(500).send('BAR ALREADY EXISTS');
      } else {
        console.log('BAR CREATED');
        Bar.create({
          id_owner: ownerId,
          bar_name: barName,
          address,
          city,
          state,
          zip,
          phone_number: number,
          latitude: lat,
          longitude: lng,
          profile_image: image,
          bar_capacity: capacity,
        })
          .then((barDetails) => {
            res.status(200).send(barDetails);
          })
          .catch((err) => console.warn('CANNOT SEND DETAILS AFTER CREATION'));
      }
    })
    .catch(() => {
      res.status(500).send('error in bar create');
    });
});

barRouter.post('/create/party', (req, res) => {
  const {
    bar_name,
    address,
    latitude,
    longitude,
  } = req.body;
  Bar.findOrCreate({
    where: {
      bar_name,
      address,
      latitude,
      longitude,
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
  Owner.findAll({ where: { email } })
    .then((owner) => {
      if (owner.length > 0) {
        Bar.findAll({ where: { id_owner: owner[0].id } })
          .then((bar) => {
            res.send(bar);
          });
      }
    });
});

barRouter.get('/info', (req, res) => {
  const { id } = req.query;
  Bar.findAll({ where: { id } })
    .then((bar) => {
      if (bar.length > 0) {
        res.send(bar);
      } else {
        res.send('NO BAR FOUND');
      }
    });
});

module.exports = {
  barRouter,
};
