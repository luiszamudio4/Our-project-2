var db = require("../models");
var passport = require("../config/passport.js");
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app){
  // ------- API/REGISTER
  app.post("/api/register", function (req, res) {
    console.log(req.body);
    db.user.create(req.body).then(function (dbUser) {
      res.json(dbUser);
    });
  });

  // ------- API/LOGIN
  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    res.json(req.user);
  });

  // ------- API/USERS
  app.get("/api/users", isAuthenticated, function (req, res) {
    db.user.findAll({
      include: [{ model: db.Coins, as: "coinsOwned" }]
    }).then(function (dbUser) {
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
<<<<<<< HEAD
      where: query
=======
      where: query,
      include: [db.user]
>>>>>>> master
    }).then(function(dbCoin) {
      res.json(dbCoin);
    });
  });
  // ------- API/COINS/:NAME 
  app.get("/api/coins/:name", isAuthenticated, function(req, res){
    db.coin.findOne({
      where: {
        name: req.params.name
<<<<<<< HEAD
      }
=======
      },
      include: [db.user]
>>>>>>> master
    }).then(function(dbCoin){
      res.json(dbCoin);
    });
  });
<<<<<<< HEAD
    
  // Create a new example (this is a test function)
  app.post("/api/coins", function(req, res) {
    db.coin.create(req.body).then(function(dbCoin) {
=======
  // // Create a new example
  // app.post("/api/coins", function(req, res) {
  //   db.Coins.create(req.body).then(function(dbCoins) {
  //     res.json(dbCoins);
  //   });
  // });
  // ------- API/COINS/BUY/:NAME 
  app.patch("/api/coins/buy/:name", isAuthenticated, function(req, res) {
    db.coin.update({userId: req.user.id}, {
      where: {
        name: req.params.name,
        userId: null
      }
    }).then(function(dbCoin){
      console.log(dbCoin);
>>>>>>> master
      res.json(dbCoin);
    });
  });
    
  app.post("/api/coins/buy/:id", isAuthenticated, function(req, res) {
    // we need the portfolio - id
    // we need the user - id
    // for the usd amount
    // we need the coin type
    // price
    // we need the amount to buy

    // req.user.id
    // portfolio based on the user id
    // req.user.usdBalance
    // usdBalance
    // portfolioId
    // get the coinType out of the database
    // coinType.price * amount = cost
    var coinId = req.params.id;
    var amount = req.body.amount;
    db.portfolio.findOne({where: {UserId: req.user.id}
    }).then(function(dbP){
      db.coinType.findOne({where:{id: coinId}}).then(function(newCoin){
        var totalCost = newCoin.price * amount;
        if(dbP.usdBalance > totalCost){
          var newBalance = dbP.usdBalance - totalCost;
          db.coin.findOne({where: {PortfolioId: dbP.id, CoinTypeId:newCoin.id }}).then(function(dbCoin){
            if(!dbCoin){
              db.coin.create({
                name: newCoin.name,
                price: newCoin.price,
                amount: amount
              }).then(function(dbC){
                db.portfolio.update({usdBalance: newBalance}, 
                  {where: {id: dbP.id}});
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
          return res.sendStatus(403).send("Sorry! Not enough money");
        }
      });
    });

  });
  // if we have the money

  // if we already have a portfolioid of that coin
  // update that amount

    
    

    

  // db.Coins.findOne({where:
  //   {name: req.params.name}, raw: true
  // }).then(function(data){
  //   delete data.id;
  //   var newCoin = db.Coins.create(data);
  //   db.Portfolios.create({name: user.req.username}).then(function(dbPortfolio){
  //     newCoin.update({id: dbPortfolio.id}, {where: {id: newCoin.id}});
  //     res.json(newCoin);
  //   });
  // });
 

<<<<<<< HEAD
  app.post("/api/register", function(req, res) {
    console.log(req.body);
    db.user.create({
      email: req.body.email, 
      username: req.body.username, 
      password: req.body.password
    }).then(function(dbUser) {
      res.json(dbUser);
      db.portfolio.create({name: dbUser.username}).then(function(dbPortfolio){
        res.json(dbPortfolio);
      });
    });
  });

  // app.post("/api/portfolio", function(req, res) {
  //   db.Portfolio.create({name: req.user.name}, {where: {}})
  // })

  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.json(req.user);
  });

  app.get("/api/users", isAuthenticated, function(req, res){
    db.user.findAll({
      include: [{model: db.portfolio, as: "portfolio"}]
    }).then(function(dbUser){
      res.json(dbUser);
    });
  });

  app.get("/api/users/:id", isAuthenticated, function(req, res){
    db.user.findOne({
      where: {
        id: req.params.id
      },
      include: [{model: db.portfolio, as: "portfolio"}]
    }).then(function(dbUser){
      res.json(dbUser);
    });
  });

  app.delete("/api/users/:id", isAuthenticated, function(req, res) {
    db.user.destroy({ where: { id: req.params.id } }).then(function(dbUser) {
      res.json(dbUser);
    });
  });
=======
>>>>>>> master
};