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
const messageRouter = Router();

messageRouter.get('/', (req, res) => {
  Message.findAll()
  .then((messages) => {
    res.send(messages);
  })
  .catch((err) => {
    res.status(500).send(err);
  });
})

messageRouter.get('/privateMessages', (req, res) => {
  const {customerOne, customerTwo} = req.query;
  Message.findAll({where : {
    [Op.or]: [{id_sender: customerOne, id_recipient: customerTwo}, {id_sender: customerTwo, id_recipient: customerOne}]
  }})
    .then(messages => {
      res.status(200).send(messages);
    })
    .catch(err => {
      res.sendStatus(500);
      console.warn(err);
    })
});

messageRouter.post('/privateMessages', (req, res) => {
  console.log(req.body,'Messages post body');
  const {id_sender, id_recipient, body} = req.body;
  Message.create({
    id_sender: id_sender,
    id_recipient: id_recipient,
    body: body
  })
    .then(message => {
      res.status(200).send('Message sent');
    })
    .catch(err => {
      res.sendStatus(500);
      console.warn(err);
    })
});

  // 
module.exports = {
  messageRouter,
};
