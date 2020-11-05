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
} = require('../db/models/dbindex.js');
const { Router } = require('express');
const { Op } = require('sequelize');

const customerRouter = Router();
const { OAuth2Client } = require('google-auth-library');
const { FormatColorResetRounded } = require('@material-ui/icons');
const { ownerWindow } = require('@material-ui/core');

const client = new OAuth2Client('');

const googleAuth = async (authToken) => {
  const ticket = await client.verifyIdToken({
    idToken: authToken,
    audience: '933644302187-agamsig0qalm5oi4fd44v11hfffpchs8.apps.googleusercontent.com',
  });
  const payload = ticket.getPayload();
  console.info(`USER ${payload.name} VERIFIED`);

  const {
    sub, email, name, picture,
  } = payload;
  const userId = sub;
<<<<<<< HEAD
=======
  // console.info(userId, email)
>>>>>>> 5e56945... (update) Ability to sign up with google and sign in with google complete
  return {
    userId, email, fullName: name, photoUrl: picture,
  };
};

customerRouter.post('/', (req, res) => {
  const { authToken } = req.body.googleToken;
  googleAuth(authToken);
});

customerRouter.get('/gId/:gId', (req, res) => {
  const { gId } = req.params;
  Customer.findOne({
    where: {
      id_google: `${gId}`,
    },
  })
    .then((customers) => {
      res.send(customers);
    })
    .catch((err) => {
<<<<<<< HEAD
      console.warn('ERROR IN CHECK FOR CUSTOMER BY GoogleID');
=======
      console.error('ERROR IN CHECK FOR CUSTOMER BY GoogleID');
>>>>>>> 5e56945... (update) Ability to sign up with google and sign in with google complete
    });
});

customerRouter.get('/all', (req, res) => {
  Customer.findAll()
    .then((customers) => {
      if (customers.length > 0) {
        res.send(customers);
      } else {
        res.send('empty');
      }
    })
    .catch((err) => {
<<<<<<< HEAD
      console.warn('ERROR IN CHECK FOR ALL CUSTOMERS');
=======
      console.error('ERROR IN CHECK FOR ALL CUSTOMERS');
>>>>>>> 5e56945... (update) Ability to sign up with google and sign in with google complete
    });
});

customerRouter.post('/check', async (req, res) => {
  const { authToken } = req.body.googleToken;
  const auth = await googleAuth(authToken);
  console.info(auth);
  Customer.findAll({ where: { id_google: auth.userId } }) // findAll sends back an array
    .then((customers) => {
      if (customers.length > 0) {
        console.info('USER FOUND IN CUSTOMER TABLE');
        res.send('customer');
      } else {
        console.info('USER NOT FOUND IN CUSTOMER TABLE');
        res.send('form');
      }
    })
    .catch((err) => {
<<<<<<< HEAD
      console.warn('ERROR IN CHECK FOR CUSTOMER OR OWNER');
=======
      console.error('ERROR IN CHECK FOR CUSTOMER OR OWNER');
>>>>>>> 5e56945... (update) Ability to sign up with google and sign in with google complete
    });
});

customerRouter.post('/register', async (req, res) => {
  const { authToken } = req.body.googleToken;
  const auth = await googleAuth(authToken);
  console.info(auth);
  Customer.findAll({ where: { id_google: auth.userId } }) // findAll sends back an array
    .then((customers) => {
      if (customers.length > 0) {
        console.info('USER FOUND IN CUSTOMER TABLE');
        res.send('customer');
      } else {
        console.info('USER NOT FOUND IN CUSTOMER TABLE');
        res.send('form');
      }
    })
    .catch((err) => {
<<<<<<< HEAD
      console.warn('ERROR IN CHECK FOR CUSTOMER OR OWNER');
=======
      console.error('ERROR IN CHECK FOR CUSTOMER OR OWNER');
>>>>>>> 5e56945... (update) Ability to sign up with google and sign in with google complete
    });
});

customerRouter.post('/create', (req, res) => {
  // console.log(req.body.personalParams);
  const {
    first, last, email, number, gender, googleId, image, username,
  } = req.body.personalParams;
  // // const {
  // //   first, last, email, number, gender, googleId, image, username,
  // // } = req.body;
  Customer.findAll({ where: { id_google: googleId } })
    .then((customer) => {
      if (customer.length > 0) {
        res.send(`Customer already in database under: ${customer[0].email}`);
      } else {
        Customer.create({
          first_name: first,
          last_name: last,
          user_name: username,
          id_google: googleId,
          email,
          phone_number: number,
          gender_type: gender,
          profile_image: image,
        })
          .then((customer) => {
            res.send(`Customer has been created under: ${email}`);
          })
          .catch((err) => {
            res.status(401).send('UNABLE TO ADD');
<<<<<<< HEAD
            console.warn(err);
=======
            console.error(err);
>>>>>>> 5e56945... (update) Ability to sign up with google and sign in with google complete
          });
      }
    });

  // Customer.findAll({ where: { id_google: googleId } })
  //   .then((customers) => {
  //     if (customers.length > 0) {
  //       res.send('FOUND USER');
  //       Customer.update({
  //         first_name: first,
  //         last_name: last,
  //         user_name: username,
  //         id_google: googleId,
  //         email,
  //         phone_number: number,
  //         gender_type: gender,
  //         profile_image: image,
  //       });
  //     } else {
  //       Customer.create({
  //         first_name: first,
  //         last_name: last,
  //         user_name: username,
  //         id_google: googleId,
  //         email,
  //         phone_number: number,
  //         gender_type: gender,
  //         profile_image: image,
  //       });
  //     }
  //   })
  //   .catch((err) => {
  //     console.warn('ERROR IN CREATING CUSTOMERS');
  //   });
});

customerRouter.post('/location', (req, res) => {
  const {
    address, city, state, zip, googleId,
  } = req.body.locationParams;
  Customer.update({
    address,
    city,
    state,
    zip,
  }, { where: { id_google: googleId } });
});

customerRouter.get('/search', (req, res) => {
  const { username } = req.query;
  Customer.findAll({
    where: {
      user_name: { [Op.like]: `%${username}%` },
    },
  })
    .then((customers) => {
      // console.log(customers,'customers')s
      res.send(customers);
    });
});

customerRouter.get('/findMe', (req, res) => {
  console.log(req.query);
  const { username } = req.query;
  Customer.findAll({ where: { user_name: username } })
    .then((customer) => res.send(customer));
});

customerRouter.get('/getFriendById', (req, res) => {
  const { customerId } = req.query;
  Customer.findOne({ where: { id: customerId } })
    .then((customer) => res.send(customer));
});

module.exports = {
  customerRouter,
  googleAuth,
};
