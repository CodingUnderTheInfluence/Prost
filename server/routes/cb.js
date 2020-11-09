/* eslint-disable camelcase */
const { Router } = require('express');
const { Op } = require('sequelize');
const {
  Bar,
  Customers_Bars,
} = require('../db/models/dbindex.js');

const cbRouter = Router();

cbRouter.get('/', (req, res) => {
  Customers_Bars.findAll()
    .then((cbs) => {
      res.send(cbs);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

cbRouter.post('/checkin/create', (req, res) => {
  const {
    barName,
    address,
    city,
    state,
    zip,
    number,
    customerId,
    lat,
    lng,
  } = req.body;

  Bar.findOrCreate({
    where: {
      bar_name: barName,
      phone_number: number,
      address,
      city,
      state,
      zip,
      latitude: lat,
      longitude: lng,
    },
  })
    .then((bar) => {
      const barId = bar[0].dataValues.id;
      Customers_Bars.findOrCreate({
        where: {
          id_customer: customerId,
          id_bar: barId,
          checkin: true,
        },
      })
        .then((response) => {
          res.status(201).send(response);
        })
        .catch((err) => {
          res.status(500).send(err);
        });
    });
});

cbRouter.get('/history/:customerId', (req, res) => {
  const { customerId } = req.params;
  Customers_Bars.findAll({
    where: {
      id_customer: customerId,
    },
  })
    .then((cbs) => {
      const ids = cbs.map((bar) => ({ id: bar.id_bar }));
      // res.send(ids);
      Bar.findAll({
        where: {
          [Op.or]: ids,
        },
      })
        .then((rtn) => {
          res.send(rtn);
        })
        .catch((err) => {
          res.status(500).send(err);
        });
    });
});

cbRouter.get('/favorite/:customerId', (req, res) => {
  const { customerId } = req.params;
  Customers_Bars.findAll({
    where: {
      id_customer: customerId,
      favorite: true,
    },
  })
    .then((cbs) => {
      const ids = cbs.map((bar) => ({ id: bar.id_bar }));
      // res.send(ids);
      Bar.findAll({
        where: {
          [Op.or]: ids,
        },
      })
        .then((rtn) => {
          res.send(rtn);
        })
        .catch((err) => {
          res.status(500).send(err);
        });
    });
});

cbRouter.get('/checkin/:customerId', (req, res) => {
  const { customerId } = req.params;
  Customers_Bars.findAll({
    where: {
      id_customer: customerId,
      checkin: true,
    },
  })
    .then((cbs) => {
      const ids = cbs.map((bar) => ({ id: bar.id_bar }));
      // res.send(ids);
      Bar.findAll({
        where: {
          [Op.or]: ids,
        },
      })
        .then((rtn) => (rtn ? res.send(rtn) : res.send('Empty')))
        .catch((err) => {
          res.status(500).send(err);
        });
    });
});

cbRouter.put('/add/favorite', (req, res) => {
  const {
    id_customer,
    id_bar,
  } = req.body;
  Customers_Bars.update({
    favorite: true,
  }, {
    where: {
      id_customer,
      id_bar,
    },
  })
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

cbRouter.delete('/delete/favorite', (req, res) => {
  const {
    id_customer,
    id_bar,
  } = req.body;
  Customers_Bars.update({
    favorite: false,
  }, {
    where: {
      id_customer,
      id_bar,
    },
  })
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

cbRouter.delete('/checkout', (req, res) => {
  const {
    id_customer,
    id_bar,
  } = req.body;
  Customers_Bars.update({
    checkin: false,
  }, {
    where: {
      id_customer,
      id_bar,
    },
  })
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

cbRouter.get('/list', (req, res) => {
  const { barId } = req.query
  Customers_Bars.findAll({ where: { id_bar: barId, checkin: true } })
    .then((list) => {
      const arr = []
      list.forEach(entry => {
        arr.push(entry.id_customer)
      })
      res.send(arr)
    })
})

module.exports = {
  cbRouter,
};
