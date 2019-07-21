var db = require("../models");
// var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {

  // --------- / - MAIN PAGE
  // Load index page
  app.get("/", function(req, res) {
    res.render("index");
  });

  // --------- /LOGIN - GET
  app.get("/login", function(req, res){
    res.render("login");
  });

  app.get("/dashboard", function(req, res){
    res.render("dashboard");
  });
  // app.get("/dashboard/", isAuthenticated, function(req, res){
  //   db.user.findOne({ where: {id: req.user.id} }).then(function(dbUser){
  //     res.render("/dashboard", {
  //       user: dbUser
  //     });
  //   });
  // });

  // --------- /COINS
  app.get("/coins/", function (req, res) {
    db.coin.findAll({}).then(function (dbCoin) {
      res.render("coins", { coin: dbCoin });
    });
  });

  // --------- /COINS/:NAME
  app.get("/coins/:name", function (req, res) {
    db.coin.findOne({ where: { name: req.params.name } }).then(function (dbCoin) {
      res.render("coinPage", { coin: dbCoin });
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