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
const customerRouter = Router();

customerRouter.get('/', (req, res) => {
  Customer.findAll()
    .then((customers) => {
      res.send(customers);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
  const payload = ticket.getPayload();
  console.log(`USER ${payload.name} VERIFIED`)

  const { sub, email, name, picture } = payload;
  const userId = sub;
  // console.log(userId, email)
  return { userId, email, fullName: name, photoUrl: picture }
}

customerRouter.post('/', (req, res) => {
  const { authToken } = req.body.googleToken
  googleAuth(authToken);

})

customerRouter.post('/check', (req, res) => {
  const { gProfile } = req.body.googleProfile
  Customer.findOne({ where: gProfile.googleId })
    .then(() => {
      console.log('USER FOUND')
      res.send(true)
    })
    .catch(() => {
      console.log('USER NOT FOUND')
      res.send(false)
    })
})

// customerRouter.get('/check', (req, res) => {
//   res.send('TRUE')
// })
// Customer.findAll()
// .then((customers) => {
//   res.send(customers);
// })
// .catch((err) => {
//   res.status(500).send(err);
// });

  // 
module.exports = {
    customerRouter,
  };