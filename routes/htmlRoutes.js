var db = require("../models");
var passport = require("../config/passport");
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {

  // --------- / - MAIN PAGE
  // Load index page
  app.get("/", function(req, res) {
    db.coin.findAll({}).then(function(dbCoin) {
      res.render("index", {
        msg: "Hello!",
        coins: dbCoin
      });
    });
  });

  // --------- REGISTER
  app.get("/register", function(req, res){
    res.render("register");
  });

  // --------- /LOGIN - GET
  app.get("/login", function(req, res){
    res.render("login");
  });

  app.post("/login", passport.authenticate("local"), isAuthenticated, function(req,res){
    res.json(req.user);
  });

  app.get("/coins/", function(req, res){
    db.coinType.findAll({}).then(function(dbCoin){
      res.render("coins", {coin: dbCoin});
    });
  });

  app.get("/coins/:name", function(req, res){
    db.coinType.findOne({ where: {name: req.params.name} }).then(function(dbCoin){
      res.render("coinPage", {coin: dbCoin});
    });
  });

  app.get("/users/", function(req, res){
    db.user.findAll({}).then(function(dbUser){
      res.render("users", {user: dbUser});
    });
  });
  // --------- /USERS/:ID
  // Load example page and pass in an example by id
  app.get("/users/:id", function(req, res) {
    db.user.findOne({ where: { id: req.params.id } }).then(function(dbUser) {
      res.render("profile", {
        user: dbUser
      });
    });
  });

  // --------- /COINS
  app.get("/coins/", function (req, res) {
    db.coin.findAll({}).then(function (dbCoin) {
      res.render("coins", { coins: dbCoin });
    });
  });

  // --------- /COINS/:NAME
  app.get("/coins/:name", function (req, res) {
    db.coin.findOne({ where: { name: req.params.name } }).then(function (dbCoin) {
      res.render("coins", { coins: dbCoin });
    });
  });

  // --------- /LOGOUT
  app.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
  });

  // --------- Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};