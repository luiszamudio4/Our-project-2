var db = require("../models");
var passport = require("../config/passport");
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Coins.findAll({}).then(function(dbCoin) {
      res.render("index", {
        msg: "Hello!",
        coins: dbCoin
      });
    });
  });

  app.get("/register", function(req, res){
    res.render("register");
  });

  app.get("/login", function(req, res){
    res.render("login");
  });

  app.post("/login", passport.authenticate("local"), isAuthenticated, function(req,res){
    res.json(req.user);
  });

  app.get("/coins/", function(req, res){
    db.Coins.findAll({}).then(function(dbCoin){
      res.render("coins", {coins: dbCoin});
    });
  });

  app.get("/coins/:name", function(req, res){
    db.Coins.findOne({ where: {name: req.params.name} }).then(function(dbCoin){
      res.render("coinPage", {coin: dbCoin});
    });
  });

  app.get("/users/", function(req, res){
    db.Users.findAll({}).then(function(dbUser){
      res.render("users", {user: dbUser});
    });
  });
  // Load example page and pass in an example by id
  app.get("/users/:id", function(req, res) {
    db.Users.findOne({ where: { id: req.params.id } }).then(function(dbUser) {
      res.render("profile", {
        user: dbUser
      });
    });
  });

  app.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
  });
  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};