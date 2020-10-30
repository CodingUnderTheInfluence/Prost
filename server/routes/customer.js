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
const { OAuth2Client } = require('google-auth-library');
const { FormatColorResetRounded } = require('@material-ui/icons');
const client = new OAuth2Client('')

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
      console.log('USER FOUND IN CUSTOMER TABLE')
      res.send('Customer')
    })
    .catch(() => {
      Owner.findOne({ where: gProfile.googleId })
        .then(() => {
          console.log('USER FOUND IN OWNER TABLE')
          res.send('Owner')
        })
        .catch(() => {
          console.log('USER NOT FOUND IN NEITHER CUSTOMER OR OWNER TABLE')
          res.send('form')
        })
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