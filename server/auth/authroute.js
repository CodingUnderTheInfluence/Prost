const express = require('express');
const passport = require('passport');
const auth = express.Router();
const { OAuth2Client } = require('google-auth-library');

auth.get('/', (res, req) => {
  res.send('THIS IS WORKING IN AUTH ')
})

auth.post('/token', (res, req) => {
  res.send('/TOKEN WORKING')
})
