const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = require('../config');

// 1. middleware to configure strategy
passport.use(new GoogleStrategy(
  {
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:8090/google/callback',
    passReqToCallback: true,
  },
  ((request, accessToken, refreshToken, profile, done) => done(null, profile)
  // User.findOrCreate({ googleId: profile.id }, function (err, user) {
  //   return done(err, user);
  // });
  ),
));

// 2. Serialization for user
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
