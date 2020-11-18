const {
  Customer,
} = require('../db/models/dbindex.js');
const { Router } = require('express');
const { Op } = require('sequelize');

const customerRouter = Router();
const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client('');

const googleAuth = async (authToken) => {
  const ticket = await client.verifyIdToken({
    idToken: authToken,
    audience: process.env.GOOGlE_CLIENT_ID,
  });
  const payload = ticket.getPayload();

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
      id_google: `${gId}`,
    },
  })
    .then((customers) => {
      res.send(customers);
    })
    .catch((err) => {
      console.warn('ERROR IN CHECK FOR CUSTOMER BY GoogleID');
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
      console.warn('ERROR IN CHECK FOR ALL CUSTOMERS');
    });
});

customerRouter.post('/check', async (req, res) => {
  const { authToken } = req.body.googleToken;
  const auth = await googleAuth(authToken);
  Customer.findAll({ where: { id_google: auth.userId } })
    .then((customers) => {
      if (customers.length > 0) {
        res.send('customer');
      } else {
        res.send('form');
      }
    })
    .catch((err) => {
      res.status(500).send('ERROR IN CHECK FOR CUSTOMER OR OWNER');
    });
});

customerRouter.post('/register', async (req, res) => {
  const { authToken } = req.body.googleToken;
  const auth = await googleAuth(authToken);
  Customer.findAll({ where: { id_google: auth.userId } })
    .then((customers) => {
      if (customers.length > 0) {
        res.send('customer');
        console.info('CUSTOMER FOUND', customers[0]);
      } else {
        res.status(200).send('form');
      }
    })
    .catch((err) => {
      res.status(500).send('ERROR IN CREATION FOR CUSTOMER OR OWNER');
    });
});

customerRouter.post('/create', (req, res) => {
  console.info(req.body.personalParams);
  const {
    first,
    last,
    email,
    number,
    googleId,
    image,
    username,
  } = req.body.personalParams;
  // TODO: REFACTOR these nested statements
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
          profile_image: image,
        })
          .then((customer) => {
            res.send(`Customer has been created under: ${email}`);
          });
      }
    })
    .catch((err) => {
      res.status(401).send('UNABLE TO ADD');
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
      res.send(customers);
    })
    .catch((err) => console.warn(err));
});

customerRouter.get('/findMe', (req, res) => {
  const { gId } = req.query;
  Customer.findOne({ where: { id_google: gId } })
    .then((customer) => res.send(customer))
    .catch((err) => console.warn(err));
});

customerRouter.get('/getFriendById', (req, res) => {
  const { customerId } = req.query;
  Customer.findOne({ where: { id: customerId } })
    .then((customer) => res.send(customer))
    .catch((err) => console.warn(err));
});

/*
THIS GRABS CUSTOMER'S USERNAME
*/
customerRouter.get('/username', (req, res) => {
  const { user } = req.query;
  Customer.findOne({ where: { id: user } })
    .then((customer) => res.send(customer))
    .catch((err) => res.status(500).send('ERROR IN FINDING CUSTOMER', err));
});

/*
THIS FUNCTION UPDATES USER NAME FOR SPECIFIC CUSTOMER
*/
customerRouter.post('/updateUserName', (req, res) => {
  const { user, newName } = req.query;
  Customer.update({
    user_name: newName,
  }, { where: { id: user } })
    .then((customer) => { res.send(customer.user_name); });
});

customerRouter.put('/location/:gId', (req, res) => {
  const { gId } = req.params;
  console.log(req.body)
  const { isPrivate, lat, lng } = req.body;
  Customer.update(
    {
      lat,
      lng,
      isPrivate,
    },
    {
      returning: true,
      where: { id_google: gId },
    },
  )
    .then(([udatedLine, [updatedPrivate]]) => {
      res.status(201).send(updatedPrivate);
    })
    .catch((err) => res.send(err));
});

module.exports = {
  customerRouter,
  googleAuth,
};
