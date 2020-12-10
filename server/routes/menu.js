const { Router } = require('express');
const { Op } = require('sequelize');
const {
  Bar,
  Menu,
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

menuRouter.get('/allbars', (req, res) => {
  Menu.findAll()
    .then((menus) => {
      const ids = menus.map((bar) => ({ id: bar.id_bar }));
      return Bar.findAll({
        where: {
          [Op.or]: ids,
        },
      });
    })
    .then((rtn) => {
      res.send(rtn);
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
      res.status(500).send('Menu Get Error', err);
    });
});

menuRouter.post('/insert', (req, res) => {
  const { barId, info, lang } = req.body;
  Menu.create({
    id_bar: barId,
    info,
    lang,
  })
    .then((menus) => res.send(menus))
    .catch((err) => {
      res.status(500).send(err);
    });
});

menuRouter.put('/update', (req, res) => {
  const { barId, info } = req.body;
  Menu.update({
    info,
  },
  {
    where: {
      id_bar: barId,
    },
  })
    .then((menus) => res.send(menus))
    .catch((err) => {
      res.status(500).send(err);
    });
});

menuRouter.delete('/delete/:id', (req, res) => {
  const { id } = req.params;
  Menu.destroy({
    where: {
      id_bar: id,
    },
  })
    .then(() => res.send('Success'))
    .catch((err) => {
      res.status(500).send(err);
    });
});
module.exports = {
  menuRouter,
};
