const { Maps } = require('../../server/db/models/dbindex.js');
const { Router } = require('express');
const mapRouter = Router();

mapRouter.get('/', (req, res) => {
  Maps.findAll()
    .then(map => {
      res.status(200).send(map);
    })
    .catch(err => {
      res.send(500).send(err);
    });
});


module.exports = { mapRouter };