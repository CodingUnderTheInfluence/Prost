const {
  Customer,
  Owner,
  EContact,
  Bar,
  Message,
  Image,
  Menu,
  Party,
  Friendship,
  Thread,
  Parties_Customers,
  Customers_Bars,
} = require('../db/models/dbindex.js');
const { Router, response } = require('express');
const { Op } = require('sequelize');
const friendshipRouter = Router();

friendshipRouter.get('/', (req, res) => {
  Friendship.findAll()
    .then((friendships) => {
      res.send(friendships);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
})

friendshipRouter.get('/all/friends/:customerId', (req, res) => {
  const { customerId } = req.params
  Friendship.findAll({
    where: {
      id_customer: customerId
    }
  })
    .then((friendships) => {
      const ids = friendships.map(friend => ({ "id": friend.id }));
      Customer.findAll({
        where: {
          [Op.or]: ids
        }
      })
        .then((details) => {
          details.length > 0 ? res.send(details) : res.send('Empty')
        })
        .catch((err) => {
          res.status(500).send(err);
        });
    })
})
friendshipRouter.post('/newFriend', (req, res) =>{
  const {sender, recipient, status} = req.body;
  Friendship.create({
    id_customer: sender,
    id_friend: recipient,
    status: status
  })
  res.send('Friend Request Sent!');
});

friendshipRouter.get('/myFriends', (req, res) => {
  const {customerId} = req.query;
  Friendship.findAll({where: {[Op.or]: [{id_customer: customerId}, {id_friend: customerId}]}})
    .then(friendships => {
      res.send(friendships)
    })
    .catch(err => console.warn(err));
})

friendshipRouter.delete('/removeRequest', (req, res) => {
  let f = req.body;
  Friendship.destroy({where: {id: f.id}})
    .then(res => {
      console.info(`Relationsip with Id ${f.id} destroyed`)
      res.sendStatus(200);
    })
    .catch(err => console.warn(err))
});

friendshipRouter.put('/acceptRequest', (req, res) => {
  let {data} = req.body;
  Friendship.update({status: true}, {where: {id: data.id}})
    .then(() => res.sendStatus(200))
    .catch(err => console.warn(err));
});
  // 
module.exports = {
  friendshipRouter,
};
