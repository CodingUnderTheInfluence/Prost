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

const ownerRouter = Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validInfo = require('../middleware/validInfo.js');
const authorization = require('../middleware/authorization.js');

// this creates token for user upon creation
function jwtGenerator(email) {
  const payload = {
    user: email,
  };

  return jwt.sign(payload, process.env.jwtSecret, { expiresIn: '1hr' });
}

module.exports = {
  jwtGenerator,
};

const createOwner = async (res, firstName, lastName, number, username, email, password) => {
  const saltRound = 10;
  const salt = await bcrypt.genSalt(saltRound);
  const bcryptPassword = await bcrypt.hash(password, salt);
  // adds new user inside database
  Owner.create({
    user_name: username,
    first_name: firstName,
    last_name: lastName,
    phone_number: number,
    email,
    password: bcryptPassword,
  })
    .then((owner) => {
      const token = jwtGenerator(owner.email);
      res.json({ token, owner });
    });
};

/*
  Handles all registering for owner
*/
ownerRouter.post('/register', validInfo, async (req, res) => {
  const {
    firstName,
    lastName,
    number,
    password,
    email,
    username,
  } = req.body.params;

  /*
    Checks through all of database to see if user exists, if user does not exist then it creates a user with params from req.body
  */
  Owner.findAll({ where: { email } })
    .then((owner) => {
      if (owner.length !== 0) {
        res.status(200).send(owner);
      } else {
        createOwner(res, firstName, lastName, number, username, email, password);
      }
    })
    .catch((err) => {
      console.warn('ISSUE IN GRABBING USER');
    });
});

/*
  validates password is the correct password in the DB for that user.
  uses bcrypt's compare function to compare the normally typed in pass to
    the hashed pass.
*/
const validatePassword = async (loginPass, oPassword, res, oEmail) => {
  const validPassword = await bcrypt.compare(loginPass, oPassword);
  if (!validPassword) {
    res.status(401).send('Email or Password Incorrect');
  } else {
    const token = jwtGenerator(oEmail);
    res.send(token);
    setTimeout(() => { console.info('Generated Token:', token); }, 2000);
  }
};
ownerRouter.post('/login', validInfo, async (req, res) => {
  // TODO: client side
  const {
    email,
    password,
  } = req.body.params;

  const loginPass = password;
  Owner.findAll({ where: { email } })
    .then((owner) => {
      if (owner.length > 0) {
        const oPassword = owner[0].password;
        const oEmail = owner[0].email;
        validatePassword(loginPass, oPassword, res, oEmail);
      } else {
        res.status(401).send('incorrect');
      }
    });
});

ownerRouter.post('/is-verify', authorization, async (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.warn(err);
    res.status(500).send('Server Error');
  }
});

ownerRouter.post('/id', (req, res) => {
  const { email, password } = req.body.params;

  Owner.findAll({ where: { email } })
    .then((owner) => {
      if (owner.length > 0) {
        res.send(JSON.stringify(owner[0].id));
      } else {
        res.sendStatus(500);
        console.info('OWNER NOT FOUND');
      }
    })
    .catch((err) => { console.warn(err); });
});
module.exports = {
  ownerRouter,
};
