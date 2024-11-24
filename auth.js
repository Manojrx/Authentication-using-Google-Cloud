const passport = require('passport');

var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

passport.use(new GoogleStrategy({
    clientID:     "ClientID",
    clientSecret: "ClientSecret",
    callbackURL: "http://localhost:3000/google/callback",
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
      return done(null, profile);
  }
));


passport.serializeUser(function (user,done) {
    console.log("serializeUser",user);

    done(null,user);
})

passport.deserializeUser(function (user,done) {
    console.log("serializeUser",user);
    done(null,user);
})