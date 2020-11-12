const { Router } = require('express');
const { Op } = require('sequelize');
const { Maps } = require('../db/models/dbindex.js');

const mapRouter = Router();

mapRouter.get('/', (req, res) => {
  Maps.findAll()
    .then((maps) => {
      res.status(200).send(maps);
    })
    .catch((err) => {
      res.sendStatus(err);
    });
});

mapRouter.post('/', (req, res) => {
  const {
    userName,
    gId,
    latitude,
    longitude,
    isPrivate,
  } = req.body;
  Maps.create({
    user_name: userName,
    id_google: gId,
    latitude,
    longitude,
    isPrivate,
  })
    .then((data) => res.status(201).send(data))
    .catch((err) => res.sendStatus(500));
});

mapRouter.put('/:gId', (req, res) => {
  const { gId } = req.params;
  const { isPrivate, latitude, longitude } = req.body;
  Maps.update(
    {
      latitude,
      longitude,
      isPrivate,
    },
    {
      returning: true,
      where: { id_google: gId },
    },
  )
    .then(([udatedLine, [updatedPrivate]]) => {
      res.status(201).send(updatedPrivate);
    })
    .catch((err) => res.send(err));
});

mapRouter.post('/report', (req, res) => {
  const {
    latitude,
    longitude,
    report,
  } = req.body;
  Maps.create({
    latitude,
    longitude,
    report,
  })
    .then((data) => res.send(data))
    .catch((err) => res.sendStatus(500));
});

mapRouter.delete('/report/destroy/all', (req, res) => {
  Maps.destroy({
    where: {
      [Op.or]: [{ report: 'Theft' }, { report: 'Shooting' }, { report: 'Assult' }],
    },
  })
    .then((data) => res.send(JSON.stringify(data)))
    .catch((err) => res.sendStatus(500));
});

module.exports = { mapRouter };
