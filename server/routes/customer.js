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
const { ownerWindow } = require('@material-ui/core');
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
  // console.log(userId, email)
  return { userId, email, fullName: name, photoUrl: picture }
}

customerRouter.post('/', (req, res) => {
  const { authToken } = req.body.googleToken
  googleAuth(authToken);
})

customerRouter.get('/gId/:gId', (req, res) => {
  const { gId } = req.params;
  Customer.findOne({
    where: {
      "id_google": `${gId}`
    }
  })
  .then((customers) => {
    res.send(customers);
  })
  .catch((err) => {
    console.error('ERROR IN CHECK FOR CUSTOMER BY GoogleID')
  })
})

customerRouter.get('/all', (req, res) => {
  Customer.findAll()
  .then((customers) => {
    if (customers.length > 0) {
      res.send(customers)
    } else {
      res.send('empty')
    }
  })
  .catch((err) => {
    console.error('ERROR IN CHECK FOR ALL CUSTOMERS')
  })
})

customerRouter.post('/check', async (req, res) => {
  const { gProfile } = req.body.googleProfile
  const { authToken } = req.body.googleToken
  const auth = await googleAuth(authToken);
  console.log(auth);
  Customer.findAll({ where: { id_google: auth.userId } }) //findAll sends back an array
    .then((customers) => {
      if (customers.length > 0) {
        console.log('USER FOUND IN CUSTOMER TABLE')
        res.send('customer')
      } else {
        Owner.findAll({ where: { email: gProfile.email } })
          .then((owners) => {
            if (owners.length) {
              console.log('USER FOUND IN OWNER TABLE')
              res.send('Owner')
            } else {
              console.log('USER NOT FOUND IN NEITHER CUSTOMER OR OWNER TABLE')
              res.send('form')
            }
          })
      }
    })
    .catch((err) => {
      console.error('ERROR IN CHECK FOR CUSTOMER OR OWNER')
    })
})

customerRouter.post('/create', (req, res) => {
  // console.log(req.body.personalParams)
  const { first, last, email, number, gender, googleId, image, username } = req.body.personalParams;
  Customer.findAll({ where: { id_google: googleId } })
    .then((customers) => {
      if (customers.length > 0) {
        res.send('FOUND USER')
        Customer.update({
          first_name: first,
          last_name: last,
          user_name: username,
          id_google: googleId,
          email: email,
          phone_number: number,
          gender_type: gender,
          profile_image: image,
        })
      } else {
        Customer.create({
          first_name: first,
          last_name: last,
          user_name: username,
          id_google: googleId,
          email: email,
          phone_number: number,
          gender_type: gender,
          profile_image: image,
        })
      }
    })
    .catch((err) => {
      console.error('ERROR IN CREATING CUSTOMERS')
    })
})

customerRouter.post('/location', (req, res) => {
  const { address, city, state, zip, googleId } = req.body.locationParams;
  Customer.update({
    address,
    city,
    state,
    zip,
  }, { where: { id_google: googleId } })
})

// Customer.create({
//   first_name: first,
//   last_name: last,
//   user_name: username,
//   id_google: googleId,
//   email: email,
//   phone_number: number,
//   gender_type: gender,
//   profile_image: image,
// })


// //LOCATION INFORMATION FIELDS
// const [address, setAddress] = useState('');
// const [city, setCity] = useState('');
// const [state, setState] = useState('');
// const [zip, setZip] = useState();
// //LOCATION INFORMATION SUBMIT
// const locationInformationSubmit = () => {
//     const locationParams = {
//         address: address,
//         city: city,
//         state: state,
//         zip: zip,
//     }
//     axios.post('/db/customer/location', { locationParams })
//         .then(() => {
//             console.log(` Successfully posted ${personalFirst}'s Location Information to the server`)
//         })
// }

//
module.exports = {
  customerRouter,
  googleAuth
};