// ------------------ SEQUELIZE - DB COIN TABLES
module.exports = function(sequelize, DataTypes) {
  var coin = sequelize.define("coin", {
    // ------------------ NAME
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // ------------------ PRICE
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    amount: DataTypes.INTEGER
  });

  
  coin.associate = function(models) {
<<<<<<< HEAD
    coin.belongsTo(models.coinType);
    coin.belongsTo(models.portfolio);
=======
    coin.belongsTo(models.Portfolios);
>>>>>>> bac1a6d264101566e31d00efbbd1f799b0335c62
  };

  return coin;
};
