var db = require("../models");

module.exports = function(app) {
  // Get all coins
  app.get("/api/coins", function(req, res) {
    var query= {};
    if(req.query.user_id){
      query.UserId = req.query.user_id;
    }
    db.Coins.findAll({
      where: query,
      include: [db.User]
    }).then(function(dbCoins) {
      res.json(dbCoins);
    });
  });

  app.get("/api/coins/:name", function(req, res){
    db.Coins.findOne({
      where: {
        name: req.params.name,
        id: req.params.UserId
      },
      include: [db.User]
    }).then(function(dbCoins){
      res.json(dbCoins);
    });
  });

  // Create a new example
  // app.post("/api/examples", function(req, res) {
  //   db.Example.create(req.body).then(function(dbExample) {
  //     res.json(dbExample);
  //   });
  // });

  // // Delete an example by id
  // app.delete("/api/examples/:id", function(req, res) {
  //   db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
  //     res.json(dbExample);
  //   });
  // });
};
