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


barRouter.get('/all', (req, res) => {
  Bar.findAll()
    .then((bar) => {
      res.status(200).send(bar);
    })
    .catch(err => {
      res.status(500).send('error in get bar');

    });
});

barRouter.get('/', (req, res) => {
  const { bar_name } = req.query;
  Bar.findAll({
    where: {
      bar_name: bar_name
    }
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
      id: id_bar
    }
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
  const { bar_name, address, phone_number } = req.body;
  Bar.findOrCreate({
    where: {
      bar_name: bar_name,
      address: address,
      phone_number: phone_number
    }
  })
    .then((bar) => {
      console.log('barname post', bar);
      res.status(201).send(bar);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// barRouter.post('/:bar_name', (req, res) => {
//   const { bar_name, address, } = req.body;
//   Bar.findOrCreate({
//     where: { bar_name }
//   })
//     .then((bar) => {
//       console.log('barname post', bar);
//       res.status(201).send(bar);
//     })
//     .catch((err) => {
//       res.status(500).send(err);
//     });
// });

// 
module.exports = {
  barRouter,
};