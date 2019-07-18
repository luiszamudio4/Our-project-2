var db = require("../models");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

passport.use(new LocalStrategy (
  function(username, password, done){
    db.User.findOne({where: {
      username: username
    }}).then(function(err, dbUser){
      if(err) {return done(err); }
      if(!dbUser){
        return done(null, false, {message: "Incorrect username" });
      } else if(!dbUser.validPassword(password)){
        return done(null, false, {
          message: "Incorrect password"
        });
      }
      return done(null, dbUser);
    });
  })
);

passport.serializeUser(function(user, cb){
  cb(null, user);
});
passport.deserializeUser(function(obj, cb){
  cb(null, obj);
});

module.exports = passport;