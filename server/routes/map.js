const { Maps } = require('../../server/db/models/dbindex.js');
const { Router } = require('express');
const mapRouter = Router();

mapRouter.get('/', (req, res) => {
  Maps.findAll()
    .then(maps => {
      res.status(200).send(maps);
    })
    .catch(err => {
      res.sendStatus(err);
    });
});

mapRouter.post('/', (req, res) => {
  const {
    userName,
    gId,
    latitude,
    longitude,
    isPrivate
  } = req.body;
  Maps.create({
    user_name: userName,
    id_google: gId,
    latitude: latitude,
    longitude: longitude,
    isPrivate: isPrivate
  })
    .then(data => res.status(201).send(data))
    .catch(err => res.sendStatus(500))
});

mapRouter.put('/:gId', (req, res) => {
  const { gId } = req.params;
  const { isPrivate, latitude, longitude } = req.body;
  Maps.update(
    {
      latitude: latitude,
      longitude: longitude,
      isPrivate: isPrivate
    },
    {
      returning: true,
      where: { id_google: gId }
    }
  )
    .then(([udatedLine, [updatedPrivate]]) => {
      res.status(201).send(updatedPrivate)
    })
    .catch(err => res.send(err));
});

module.exports = { mapRouter };
