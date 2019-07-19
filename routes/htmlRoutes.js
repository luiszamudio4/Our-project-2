var db = require("../models");
var passport = require("../config/passport");
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {

  // --------- / - MAIN PAGE
  // Load index page
  app.get("/", function(req, res) {
<<<<<<< HEAD
    db.Coins.findAll({}).then(function(dbCoin) {
=======
    db.coin.findAll({}).then(function(dbCoin) {
>>>>>>> master
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

<<<<<<< HEAD
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
=======
  // --------- /LOGIN - POST
  app.post("/login", passport.authenticate("local"), function(req,res){
    console.log("=======================");
    res.json(req.user);
  });

  // --------- /USERS
  app.get("/users/", function(req, res){
    db.user.findAll({}).then(function(dbUser){
>>>>>>> master
      res.render("users", {user: dbUser});
    });
  });
  // --------- /USERS/:ID
  // Load example page and pass in an example by id
  app.get("/users/:id", function(req, res) {
<<<<<<< HEAD
    db.Users.findOne({ where: { id: req.params.id } }).then(function(dbUser) {
=======
    db.user.findOne({ where: { id: req.params.id } }).then(function(dbUser) {
>>>>>>> master
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