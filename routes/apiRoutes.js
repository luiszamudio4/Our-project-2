var db = require("../models");
var passport = require("../config/passport.js");
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app){
  // ------- API/REGISTER
  app.post("/api/register", function (req, res) {
    db.user.create(req.body).then(function (dbUser) {
      res.json(dbUser);
      db.portfolio.create({name: dbUser.username, userId: dbUser.id});
    });
  });

  // ------- API/LOGIN
  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    res.json(req.user);
  });

  // ------- API/USERS
  app.get("/api/users", isAuthenticated, function (req, res) {
    db.user.findAll({}).then(function (dbUser) {
      res.json(dbUser);
    });
  });
  // ------- API/USERS/:ID - FIND
  app.get("/api/users/:id", isAuthenticated, function (req, res) {
    db.user.findOne({
      where: {
        id: req.params.id
      }
    }).then(function (dbUser) {
      res.json(dbUser);
    });
  });
  // ------- API/USERS/:ID - DELETE
  app.delete("/api/users/:id", isAuthenticated, function (req, res) {
    db.user.destroy({ where: { id: req.params.id } }).then(function (dbUser) {
      res.json(dbUser);
    });
  });
  
  // ------- API/COINS
  app.get("/api/coins", isAuthenticated, function(req, res) {
    var query= {};
    if(req.query.user_id){
      query.UserId = req.query.user_id;
    }
    db.coin.findAll({
      where: query
    }).then(function(dbCoin) {
      res.json(dbCoin);
    });
  });
  // ------- API/COINS/:NAME 
  app.get("/api/coins/:name", isAuthenticated, function(req, res){
    db.coin.findOne({
      where: {
        name: req.params.name
      }
    }).then(function(dbCoin){
      res.json(dbCoin);
    });
  });
    
  // -----------------------------------
  app.post("/api/coins/buy/:id", isAuthenticated, function(req, res) {
    var coinId = req.params.id;
    var amount = req.body.amount;    
    db.portfolio.findOne({where: {userId: req.user.id}
    }).then(function(dbP){
      db.coinType.findOne({where:{id: coinId}}).then(function(newCoin){
        var totalCost = newCoin.price * amount;
        if(dbP.usdBalance > totalCost){
          var newBalance = dbP.usdBalance - totalCost;
          db.coin.findOne({where: {PortfolioId: dbP.id, CoinTypeId: newCoin.id }}).then(function(dbCoin){
            if(!dbCoin){
              db.coin.create({
                name: newCoin.name,
                price: newCoin.price,
                amount: amount
              }).then(function(dbC){
                db.portfolio.update({usdBalance: newBalance}, 
                  {where: {id: dbP.id}});
                console.log("FIRST");
                res.json(dbC);
              });
            }else{
              db.coin.update({amount: dbCoin.amount + amount},
                {where: {id: dbCoin.id}
                }).then(function(dbC){
                db.portfolio.update({usdBalance: newBalance}, 
                  {where: {id: dbP.id}});
                res.json(dbC);
              });
            }
          });
        }else{
          return res.status(403).send("Sorry! Not enough money");
        }
      });
    });
  });

  app.post("/api/coins/sell/:id", isAuthenticated, function(req, res) {
    var coinId = req.params.id;
    var amount = req.body.amount;    
    db.portfolio.findOne({where: {userId: req.user.id}
    }).then(function(dbP){
      db.coinType.findOne({where:{id: coinId}}).then(function(newCoin){
        var totalCost = newCoin.price * amount;
        var newBalance = dbP.usdBalance + totalCost;
        db.coin.findOne({where: {PortfolioId: dbP.id, CoinTypeId: newCoin.id }}).then(function(dbCoin){
          if(amount > dbCoin.amount){
            return res.status(403).send("You don't have enough coins to sell!");
          }else{
            db.coin.update({amount: dbCoin.amount - amount},
              {where: {id: dbCoin.id}
              }).then(function(dbC){
              db.portfolio.update({usdBalance: newBalance}, 
                {where: {id: dbP.id}});
              res.json(dbC);
            });
          }
        });
      });
    });
  });
};