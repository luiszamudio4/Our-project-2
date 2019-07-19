
// ------------------ SEQUELIZE - DB COIN TABLES
module.exports = function(sequelize, DataTypes) {
  var Coins = sequelize.define("Coins", {
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
    // ------------------ COIN RANK
    coinRank: DataTypes.INTEGER    
  });

  
  Coins.associate = function(models) {
    Coins.belongsTo(models.Portfolios);
  };

  return Coins;
};
