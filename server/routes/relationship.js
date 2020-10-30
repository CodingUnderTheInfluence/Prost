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
const relationshipRouter = Router();

relationshipRouter.get('/', (req, res) => {
  Relationship.findAll()
  .then((relationships) => {
    res.send(relationships);
  })
  .catch((err) => {
    res.status(500).send(err);
  });
})

relationshipRouter.get('/all/following/:followingID', (req, res) => {
  const { followingID } = req.params;
  Relationship.findAll({
    where: {
      id_following: followingID
    }
  })
  .then((relationships) => {
    res.send(relationships);
  })
  .catch((err) => {
    res.status(500).send(err);
  });
})

relationshipRouter.get('/all/follower/:followerID', (req, res) => {
  const { followerID } = req.params;
  Relationship.findAll({
    where: {
      id_follower: followerID
    }
  })
  .then((relationships) => {
    res.send(relationships);
  })
  .catch((err) => {
    res.status(500).send(err);
  });
})
/*
  "id": 1,
  "id_follower": 2,
  "id_following": 1,
  "createdAt": "2020-10-30T19:26:49.003Z",
  "updatedAt": "2020-10-30T19:26:49.003Z"
*/

  // 
module.exports = {
  relationshipRouter,
};