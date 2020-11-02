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
const ownerRouter = Router();
const bcrypt = require('bcrypt')

// ownerRouter.get('/', (req, res) => {
//   Owner.findAll()
//     .then((owners) => {
//       res.send(owners);
//     })
//     .catch((err) => {
//       res.status(500).send(err);
//     });
// })

const createOwner = async (res, name, email, password) => {
  const saltRound = 10;
  const salt = await bcrypt.genSalt(saltRound);
  const bcryptPassword = await bcrypt.hash(password, salt);
  //adds new userinside database
  Owner.create({
    first_name: name,
    email: email,
    password: bcryptPassword,
  })
    .then((owner) => {
      res.send(owner)
    })
}

ownerRouter.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  Owner.findAll({ where: { email: email } })
    .then((owner) => {
      if (owner.length !== 0) {
        res.status(200).send(owner)
        console.log('OWNER ALREADY EXISTS IN OWNER TABLE')
      } else {
        createOwner(res, name, email, password);
      }
    })
    .catch(err => {
      console.error('ISSUE IN GRABBING USER')
    })
})

// 
module.exports = {
  ownerRouter,
};