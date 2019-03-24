const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const users = require("./../data/users");

passport.use(
  "local",
  new LocalStrategy(
    {
      usernameField: "userName",
      passwordField: "password",
      session: false
    },
    function(userName, password, done) {
      let user = users.find(user => user.userName === userName);

      if (!user || user.password !== password) {
        done(null, false);
      } else {
        done(null, user);
      }
    }
  )
);

passport.use(
  "facebook",
  new FacebookStrategy(
    {
      clientID: '290071505018501',
      clientSecret: "4f06e1f01733505e15ea0ae31b911ce3",
      callbackURL: "http://localhost:8080/auth/facebook/callback"
    },
    (accessToke, refreshToken, profile, cb) => {
      console.log("UUUUUUUUUUUU", accessToke, refreshToken, profile);
      let user = users.find(user => user.userName === userName);

      if (!user || user.password !== password) {
        cb(null, false);
      } else {
        cb(null, user);
      }
    }
  )
);

module.exports = passport;
