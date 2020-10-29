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
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client('')


const googleAuth = async (authToken) => {
  const ticket = await client.verifyIdToken({
    idToken: authToken,
    audience: '933644302187-agamsig0qalm5oi4fd44v11hfffpchs8.apps.googleusercontent.com'
  });
  const payload = ticket.getPayload();
  console.log(`USER ${payload.name} VERIFIED`)

  const { sub, email, name, picture } = payload;
  const userId = sub;
  console.log(userId, email)
  return { userId, email, fullName: name, photoUrl: picture }
}

customerRouter.post('/', (req, res) => {
  const { authToken } = req.body.params
  googleAuth(authToken);
})
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
  googleAuth
};