var db = require("../models");
var passport = require("../config/passport.js");
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app){
  // ------- API/REGISTER
  app.post("/api/register", function (req, res) {
    console.log(req.body);
    db.User.create(req.body).then(function (dbUser) {
      res.json(dbUser);
    });
  });

  // ------- API/LOGIN
  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    res.json(req.user);
  });

  // ------- API/USERS
  app.get("/api/users", isAuthenticated, function (req, res) {
    db.User.findAll({
      include: [{ model: db.Coins, as: "coinsOwned" }]
    }).then(function (dbUser) {
      res.json(dbUser);
    });
  });
  // ------- API/USERS/:ID - FIND
  app.get("/api/users/:id", isAuthenticated, function (req, res) {
    db.User.findOne({
      where: {
        id: req.params.id
      }
    }).then(function (dbUser) {
      res.json(dbUser);
    });
  });
  // ------- API/USERS/:ID - DELETE
  app.delete("/api/users/:id", isAuthenticated, function (req, res) {
    db.User.destroy({ where: { id: req.params.id } }).then(function (dbUser) {
      res.json(dbUser);
    });
  });
  
  // ------- API/COINS
  app.get("/api/coins", isAuthenticated, function(req, res) {
    var query= {};
    if(req.query.user_id){
      query.UserId = req.query.user_id;
    }
    db.Coin.findAll({
      where: query,
      include: [db.User]
    }).then(function(dbCoin) {
      res.json(dbCoin);
    });
  });
  // ------- API/COINS/:NAME 
  app.get("/api/coins/:name", isAuthenticated, function(req, res){
    db.Coin.findOne({
      where: {
        name: req.params.name
      },
      include: [db.User]
    }).then(function(dbCoin){
      res.json(dbCoin);
    });
  });
  // // Create a new example
  // app.post("/api/coins", function(req, res) {
  //   db.Coins.create(req.body).then(function(dbCoins) {
  //     res.json(dbCoins);
  //   });
  // });
  // ------- API/COINS/BUY/:NAME 
  app.patch("/api/coins/buy/:name", isAuthenticated, function(req, res) {
    db.Coin.update({userId: req.user.id}, {
      where: {
        name: req.params.name,
        userId: null
      }
    }).then(function(dbCoin){
      console.log(dbCoin);
      res.json(dbCoin);
    });
  });

};