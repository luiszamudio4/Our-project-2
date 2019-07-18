
// ------------------ SEQUELIZE - DB COIN TABLES
module.exports = function(sequelize, DataTypes) {
  var Coin = sequelize.define("Coin", {
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

  
  Coin.associate = function(models) {
    Coin.belongsTo(models.User);
  };

  return Coin;
};
