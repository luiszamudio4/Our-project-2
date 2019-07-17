var db = require("../models");
var passport = require("../config/passport");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    res.render("index", {msg:"Hello!"});
  });

  app.get("/register", function(req, res){
    res.render("register");
  });

<<<<<<< HEAD
  app.get("/login", function(req, res){
    res.render("login");
  });

  app.post("/login", passport.authenticate("local"), function(cb){
    cb({
=======
  app.post("/login", passport.authenticate("local"), function(req, res) {
    res.json({
>>>>>>> 2381066f408f3c8e380ba3464a283efd95ceb7a3
      successRedirect: "/",
      failureRedirect: "/login",
      failureFlash: true
    });
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
      res.render("example", {
        example: dbExample
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