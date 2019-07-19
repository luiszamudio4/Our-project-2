var db = require("../models");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

passport.use(new LocalStrategy (
  function(username, password, done){
    console.log(username);
    console.log(password);
<<<<<<< HEAD
    db.User.findOne({
=======
    db.user.findOne({
>>>>>>> 6b873cd394b8f44d5515d533d87d47307488c972
      where: { username: username }
    }).then(function(dbUser){
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