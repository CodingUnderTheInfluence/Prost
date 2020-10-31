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

customerRouter.post('/check', (req, res) => {
  const { gProfile } = req.body.googleProfile
  Customer.findAll({ where: gProfile.googleId })
    .then(() => {
      console.log('USER FOUND IN CUSTOMER TABLE')
      res.send('Customer')
    })
    .catch(() => {
      Owner.findAll({ where: { id_google: gProfile.googleId } })
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

customerRouter.post('/create', (req, res) => {
  // console.log(req.body.personalParams)
  const { first, last, email, number, gender, googleId, image, username } = req.body.personalParams;
  Customer.findAll({ where: googleId })
    .then(() => {
      res.send('FOUND USER')
    })
    .catch(() => {
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

<<<<<<< HEAD
// 
=======
>>>>>>> e08ff03... (update) user able to be added to database via form, user info can be updated
module.exports = {
  customerRouter,
};