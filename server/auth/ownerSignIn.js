const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.serializeUser((user, done) => {
  // Setting userId obj on req.session
  done(null, user);
});

passport.deserializeUser((user, done) => {
  // attach user obj and pass back
  done(null, user);
});

passport.use(new LocalStrategy(
  (username, password, done) => {
    done(null, 'user');
  },
));
