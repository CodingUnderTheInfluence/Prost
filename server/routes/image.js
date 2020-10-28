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
const imageRouter = Router();

imageRouter.get('/', (req, res) => {
  Image.findAll()
  .then((images) => {
    res.send(images);
  })
  .catch((err) => {
    res.status(500).send(err);
  });
})

//grab message's image example
imageRouter.get('/message/:messageId', (req, res) => {
  const { messageId } = req.params;
  Image.findAll({
    where: {
      id_message: {
        [Op.eq]: messageId
      }
    }
  })
  .then((images) => {
    res.send(images);
    })
  .catch((err) => {
    res.status(500).send(err);
  });
})
 
module.exports = {
  imageRouter,
};