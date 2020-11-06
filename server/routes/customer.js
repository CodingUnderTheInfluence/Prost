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
  console.info('ticket', ticket);
  const payload = ticket.getPayload();
  console.info('payload', payload)
  console.info(`USER ${payload.name} VERIFIED`)

  const {
    sub, email, name, picture,
  } = payload;
  const userId = sub;
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
      "id_google": `${gId}`
    }
  })
    .then((customers) => {
      res.send(customers);
    })
    .catch((err) => {
      console.warn('ERROR IN CHECK FOR CUSTOMER BY GoogleID')
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
      console.warn('ERROR IN CHECK FOR ALL CUSTOMERS')
    })
})

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
      console.warn('ERROR IN CHECK FOR CUSTOMER OR OWNER');
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
      console.warn('ERROR IN CHECK FOR CUSTOMER OR OWNER');
    });
});

customerRouter.post('/create', (req, res) => {
  // console.info(req.body.personalParams);
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
            res.send(`Customer has been created under: ${customer[0].email}`);
          })
          .catch((err) => {
            res.status(401).send('UNABLE TO ADD');
            console.warn(err);
          });
      }
    });
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
      // console.info(customers,'customers')s
      res.send(customers);
    })
    .catch((err) => console.warn(err));
});

customerRouter.get('/findMe', (req, res) => {
  console.info(req.query);
  const { username } = req.query;
  Customer.findAll({ where: { user_name: username } })
    .then((customer) => res.send(customer));
});

customerRouter.get('/getFriendById', (req, res) => {
  const { customerId } = req.query;
  console.info('Grabbing information for customerID: ', customerId);
  Customer.findOne({ where: { id: customerId } })
    .then((customer) => res.send(customer))
    .catch((err) => console.warn(err));
});

module.exports = {
  customerRouter,
  googleAuth,
};
