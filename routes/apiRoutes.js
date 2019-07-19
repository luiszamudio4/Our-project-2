var db = require("../models");
var passport = require("../config/passport.js");
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app){
  app.get("/api/coins", isAuthenticated, function(req, res) {
    var query= {};
    if(req.query.user_id){
      query.UserId = req.query.user_id;
    }
    db.Coins.findAll({
      where: query,
      include: [db.Portfolios]
    }).then(function(dbCoin) {
      res.json(dbCoin);
    });
  });
    
  app.get("/api/coins/:name", isAuthenticated, function(req, res){
    db.Coins.findOne({
      where: {
        name: req.params.name
      },
      include: [db.Portfolios]
    }).then(function(dbCoin){
      res.json(dbCoin);
    });
  });
    
  // Create a new example (this is a test function)
  app.post("/api/coins", function(req, res) {
    db.Coins.create(req.body).then(function(dbCoins) {
      res.json(dbCoins);
    });
  });
    
  app.post("/api/coins/buy/:name", isAuthenticated, function(req, res) {    
    db.Coins.findOne({where:
      {name: req.params.name}, raw: true
    }).then(function(data){
      delete data.id;
      var newCoin = db.Coins.create(data);
      db.Portfolios.create({name: user.req.username}).then(function(dbPortfolio){
        newCoin.update({id: dbPortfolio.id}, {where: {id: newCoin.id}});
        res.json(newCoin);
      });
    });
  });

  app.post("/api/register", function(req, res) {
    console.log(req.body);
    db.Users.create({
      email: req.body.email, 
      username: req.body.username, 
      password: req.body.password
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  // app.post("/api/portfolio", function(req, res) {
  //   db.Portfolio.create({name: req.user.name}, {where: {}})
  // })

  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.json(req.user);
  });

  app.get("/api/users", isAuthenticated, function(req, res){
    db.Users.findAll({
      include: [{model: db.Portfolios, as: "portfolio"}]
    }).then(function(dbUser){
      res.json(dbUser);
    });
  });

  app.get("/api/users/:id", isAuthenticated, function(req, res){
    db.Users.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbUser){
      res.json(dbUser);
    });
  });

  app.delete("/api/users/:id", isAuthenticated, function(req, res) {
    db.Users.destroy({ where: { id: req.params.id } }).then(function(dbUser) {
      res.json(dbUser);
    });
  });
};