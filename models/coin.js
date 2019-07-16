module.exports = function(sequelize, DataTypes) {
  var Coin = sequelize.define("coins", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    }    
  });

  Coin.associate = function(models) {
    Coin.belongsTo(models.User);
  };

  return Coin;
};
