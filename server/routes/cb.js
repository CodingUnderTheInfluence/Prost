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
const cbRouter = Router();

cbRouter.get('/', (req, res) => {
  Customers_Bars.findAll()
  .then((cbs) => {
    res.send(cbs);
  })
  .catch((err) => {
    res.status(500).send(err);
  });
})

cbRouter.get('/history/:customerId', (req, res) => {
  const {customerId} = req.params;
  Customers_Bars.findAll({
    where: {
      id_customer: customerId
    }
  })
  .then((cbs) => {
    const ids = cbs.map(bar => ({"id": bar["id_bar"]}))
    // res.send(ids);
    Bar.findAll({
      where: {
        [Op.or]: ids,
      }
    })
    .then((rtn) => {
      res.send(rtn);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
  })
})

cbRouter.get('/favorite/:customerId', (req, res) => {
  const {customerId} = req.params;
  Customers_Bars.findAll({
    where: {
      id_customer: customerId,
      favorite: true
    }
  })
  .then((cbs) => {
    const ids = cbs.map(bar => ({"id": bar["id_bar"]}))
    // res.send(ids);
    Bar.findAll({
      where: {
        [Op.or]: ids,
      }
    })
    .then((rtn) => {
      res.send(rtn);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
  })
})

module.exports = {
  cbRouter,
};