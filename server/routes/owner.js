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

const createOwner = async (res, firstName, lastName, number, username, email, password) => {
  const saltRound = 10;
  const salt = await bcrypt.genSalt(saltRound);
  const bcryptPassword = await bcrypt.hash(password, salt);
  //adds new userinside database
  Owner.create({
    user_name: username,
    first_name: firstName,
    last_name: lastName,
    phone_number: number,
    email: email,
    password: bcryptPassword,
  })
    .then((owner) => {
      res.send(owner)
    })
}

ownerRouter.post('/register', async (req, res) => {
  // const { name, email, password } = req.body;
  const { firstName, lastName, number, password, email, username } = req.body.params
  console.log('FORM PARAMS', req.body.params)

  Owner.findAll({ where: { email: email } })
    .then((owner) => {
      if (owner.length !== 0) {
        res.status(200).send(owner)
        console.log('OWNER ALREADY EXISTS IN OWNER')
      } else {
        createOwner(res, firstName, lastName, number, username, email, password);
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