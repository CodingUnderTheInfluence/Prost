const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();

const {
  Customer, Owner,
} = require('../db/models/dbindex');

passport.serializeUser((user, done) => {
  // Setting userId obj on req.session
  done(null, {user});
});

passport.deserializeUser((user, done) => {
  //attach user obj and pass back
  done(null, {user})
});

// defining how passport will use google strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.REDIRECT}/auth/customer/auth/google/callback`,
    },
    (accessToken, refreshToken, profile, done) => {
      // console.log(accessToken);
      // console.log(refreshToken);
      // console.log(profile);
      console.log(`=============${process.env.REDIRECT}========`)
      // accessToken, and refreshToken can be used for additional google products
      if(!profile) {
        return done(null, false);
      }
      const data = {
        id: profile.id,
        fullName: profile.displayName,
        lastName: profile.name.familyName,
        firstName: profile.name.givenName,
        email: profile.emails[0].value,
        photo: profile.photos[0].value,
      };
      // use the profile info (profile id) to check if the user is registered in the db
      return done(null, 'user')
    },
  ),
);
