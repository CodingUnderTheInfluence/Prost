const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
passport.serializeUser((user, done) => {
  // Setting userId obj on req.session
  done(null, user);
});

passport.deserializeUser((user, done) => {
  //attach user obj and pass back
  done(null, user)
});

passport.use(new LocalStrategy(
  function(username, password, done) {
    console.log('~~~~~~~~~~~~');
    console.log(username, password);
    // User.findOne({ username: username }, function(err, user) {
    //   if (err) { return done(err); }
    //   if (!user) {
    //     return done(null, false, { message: 'Incorrect username.' });
    //   }
    //   if (!user.validPassword(password)) {
    //     return done(null, false, { message: 'Incorrect password.' });
    //   }
    //   return done(null, user);
    // });
    done(null,'user')
  }
));