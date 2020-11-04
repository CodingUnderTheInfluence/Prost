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
const { Router } = require('express');
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
    const ids = friendships.map(friend => ({"id": friend.id}));
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
  // console.log(sender, recipient, status);
  Friendship.create({
    id_customer: sender,
    id_friend: recipient,
    status: status
  })
  res.send('Friend Request Sent!');
});

friendshipRouter.get('/myFriends', (req, res) => {
  const {customerId} = req.query;
  console.log(customerId, 'customerId')
  Friendship.findAll({where: {id_customer: customerId}})
  .then(friendships => res.send(friendships))
})
  // 
module.exports = {
  friendshipRouter,
};