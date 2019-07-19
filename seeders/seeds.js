var db = require("../models");
var syncOptions = { force: false };

if(process.env.NODE_ENV === "test"){
  syncOptions.force = true;
}

db.sequelize.sync(syncOptions).then(function(){
  db.coinType.bulkCreate([
    {
      name: "Bitcoin",
      price: "10404.84"
    },
    {
      name: "Ethereum",
      price: "223.62"
    }
  ]).then(function(coins){
    console.log(coins);
  });
});