var db = require("../models");
var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

db.sequelize.sync(syncOptions).then(function () {
  db.coinType.bulkCreate([
    {
      name: "Bitcoin",
      price: 10420.45
    },
    {
      name: "Ethereum",
      price: 223.62
    }
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
  ).then(function(user){
    console.log(user);
  });
});

// insert into coin(name, price, coinRank)
// values("Bitcoin", 9814.45, 1),
//     ("Ethereum", 213.65, 2),
//     ("Litecoin", 89.61, 3),
//     ("Bitcoin Cash", 294.94, 4),
//     ("EOS", 3.92, 5),
//     ("Tether", 1.00, 6);

// insert into user(username, email, password)
// values("Mac Daddy", "daddymac@yahoo.com", "jumpjump123"),
//     ("Dr. Baggio", "bigbags69@gmail.com", "mypasswordyes"),
//     ("Aubrey Graham", "drake@ovo.com", "wh33lchairJimmy");
