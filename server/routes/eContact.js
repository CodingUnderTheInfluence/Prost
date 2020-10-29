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
const eContactRouter = Router();

eContactRouter.get('/', (req, res) => {
  EContact.findAll()
  .then((eContacts) => {
    res.send(eContacts);
  })
  .catch((err) => {
    res.status(500).send(err);
  });
})

eContactRouter.get('/customer/:customerId', (req, res) => {
  const {customerId} = req.params;
  // res.send(`id ${customerId}`)
  EContact.findAll({
    where: {
      id_customer: customerId
    }
  })
  .then((eContacts) => {
    eContacts.length > 0 ? res.send(eContacts) : res.send('Empty');
  })
  .catch((err) => {
    res.status(500).send(err);
  });
})

eContactRouter.post('/add', (req, res) => {
  const {
    customerId,
    first_name,
    last_name,
    phone_number,
    email
  } = req.body;
  // res.send(`id ${customerId}`)
  EContact.findOrCreate({
    where: {
      id_customer: customerId,
      first_name,
      last_name,
      phone_number,
      email
    },
  })
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
})

eContactRouter.put('/edit', (req, res) => {
  const {
    eContactId,
    first_name,
    last_name,
    phone_number,
    email
  } = req.body;
  console.log(req.body);
  EContact.update({
      first_name,
      last_name,
      phone_number,
      email
  }, {
    where: {
      id: eContactId,
    },
  })
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
})
module.exports = {
  eContactRouter,
};