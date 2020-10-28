const express = require('express');
const passport = require('passport');
const auth = express.Router();
require('./custSignIn');

auth.get(
  '/customer/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }),
);

auth.get(
  '/customer/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Unsuccessful authentication redirect home.
    // Successful authentication redirect to account 
    // This should be expanded to check for students as well in the future
    res.redirect('/auth/good');
  },
);

auth.get(
  '/good', (req, res) => {
    // req.session.passport = null;
    // console.log(req.user);
    // console.log(req.session);
    req.user ? res.send('good login') : res.redirect('/');
  });
auth.get(
  '/logout', (req, res) => {
    // req.session.passport = null;
    req.logOut(); // logout from passport
    req.session = null; // destory the session
    res.redirect('/'); // send them to where is needed
  });

  auth.post('/owner/login',
  passport.authenticate('local', { 
    successRedirect: '/auth/good',
    failureRedirect: '/',
    // failureFlash: true,
    // successFlash: 'Welcome!'
   }));

  // auth.post('/owner/login', (req, res) => {
  //   res.send('hello world');
  // });

module.exports = auth;