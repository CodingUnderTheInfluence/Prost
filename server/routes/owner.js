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
const bcrypt = require('bcrypt');
// const jwtGenerator = require('../utils/jwtGenerator.js');
const jwt = require('jsonwebtoken');
const validInfo = require('../middleware/validInfo.js');
const authorization = require('../middleware/authorization.js');
const denied = '/Users/larryschwalliv/prost/fork/Prost/server/images/giphy.gif'
const welcomed = '/Users/larryschwalliv/prost/fork/Prost/server/images/welcomeback.gif'

//this creates token for user upon creation
function jwtGenerator(email) {
  const payload = {
    user: email
  }

  return jwt.sign(payload, process.env.jwtSecret, { expiresIn: "1hr" })
}

module.exports = {
  jwtGenerator,
}

const createOwner = async (res, firstName, lastName, number, username, email, password) => {
  const saltRound = 10;
  const salt = await bcrypt.genSalt(saltRound);
  const bcryptPassword = await bcrypt.hash(password, salt);
  //adds new user inside database
  Owner.create({
    user_name: username,
    first_name: firstName,
    last_name: lastName,
    phone_number: number,
    email: email,
    password: bcryptPassword,
  })
    .then((owner) => {
      const token = jwtGenerator(owner.email);
      res.json({ token })
    })
}

/*
  Handles all registering for owner
*/
ownerRouter.post('/register', validInfo, async (req, res) => {
  //postman use
  const {
    firstName,
    lastName,
    number,
    password,
    email,
    username
  } = req.body
  //client side of app
  // const { 
  //   firstName, 
  //   lastName, 
  //   number, 
  //   password, 
  //   email, 
  //   username 
  // } = req.body.params

  /*
    Checks through all of database to see if user exists, if user does not exist then it creates a user with params from req.body
  */
  Owner.findAll({ where: { email: email } })
    .then((owner) => {
      if (owner.length !== 0) {
        res.status(200).send(owner)
        console.log('OWNER ALREADY EXISTS IN OWNER')
      } else {
        createOwner(res, firstName, lastName, number, username, email, password,);
      }
    })
    .catch(err => {
      console.error('ISSUE IN GRABBING USER')
    })
})


/*
  validates password is the correct password in the DB for that user.
  uses bcrypt's compare function to compare the normally typed in pass to
    the hashed pass.
*/
const validatePassword = async (loginPass, oPassword, res, oEmail) => {
  const validPassword = await bcrypt.compare(loginPass, oPassword)
  if (!validPassword) {
    // res.status(401).sendFile(denied)
    res.status(401).send('Email or password incorrect')
  } else {
    const token = jwtGenerator(oEmail);
    // res.sendFile(welcomed)
    res.json(`Dobby has returned with your token master....${token}`)
    console.log(`Password validated. ${oEmail}'s token is being created...`)
    setTimeout(() => { console.log('Generated Token:', token) }, 2000)
  }
}
//login router
ownerRouter.post("/login", validInfo, async (req, res) => {
  //postman
  // const {
  //   email,
  //   password
  // } = req.body;

  //client side
  const {
    email,
    password
  } = req.body.params

  const loginPass = password
  Owner.findAll({ where: { email: email } })
    .then((owner) => {
      if (owner.length > 0) {
        let oPassword = owner[0].password;
        let oEmail = owner[0].email;
        // console.log(typeof loginPass, 'LOGIN PASS')
        validatePassword(loginPass, oPassword, res, oEmail)
      } else {
        // res.status(401).sendFile(denied)
        res.status(401).send('Email or password incorrect')
      }
    })
})


ownerRouter.post('/is-verify', authorization, async (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
})
module.exports = {
  ownerRouter,
};