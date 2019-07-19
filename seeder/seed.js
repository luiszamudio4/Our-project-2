var db = require("../models");
var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

db.sequelize.sync(syncOptions).then(function () {
  db.coin.bulkCreate([
    {
      name: "Bitcoin",
      price: 9814.45
    },
    {
      name: "Ethereum",
      price: 213.65
    },
    {
      name: "Litecoin",
      price: 89.61
    },
    {
      name: "Bitcoin Cash",
      price: 294.94
    },
    {
      name: "EOS",
      price: 3.92
    },
    {
      name: "Tether",
      price: 1.00
    },

  ]).then(function (coins) {
    console.log(coins);
  });
  db.user.create(
    {
      username:"MacDaddy",
      email:"daddymac@yahoo.com",
      password:"jumpjump123"
    },
    {
      username: "DrBaggio",
      email: "drbaggio@baggioenterprise.com",
      password: "1234"
    }
  );
});