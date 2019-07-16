module.exports = function(sequelize, DataTypes) {
  var Coin = sequelize.define("Coins", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    coinRank: DataTypes.INTEGER    
  });

  Coin.associate = function(models) {
    Coin.belongsTo(models.User);
  };

  return Coin;
};
